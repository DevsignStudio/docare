Requests = new Mongo.Collection("requests");

// var Schema = {};
// Schema.Requests = new SimpleSchema({
//     text: {
//         type: String,
//         label: "Text"
//     },
//     createdAt: {
//         type: Date,
//         label: "Created At",
//     },
// });
//
// Requests.attachSchema(Schema.Requests);

Requests.helpers({
    patient: function() {
        return Meteor.users.findOne({_id: this.patientId});
    },
    
});

Meteor.methods({
    sendRequest: function(doctorUsername) {
        var doctorExist;

        Meteor.call("usernameExists", doctorUsername, function(err, res) {
            doctorExist = res;
        });

        if (typeof doctorExist !== "undefined") {
            var doctor = Meteor.users.findOne({_id: doctorExist});
            var patient = Meteor.users.findOne({_id: Meteor.user()._id});
            var success = true;
            Meteor.call("addRequest",patient, doctor, function(err, res) {
                success = res;
            });

            return success;
        }

        return false;
    },
    addRequest: function(patient, doctor){
        var req = Requests.findOne({patientId: patient._id});
        var hasRequest;

        Meteor.call("hasRequest", patient,doctor, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                hasRequest = result;
            }
        });

        if (hasRequest) {
            return false;
        }

        Requests.insert({
            patientId: patient._id,
            doctorId: doctor._id,
            createdAt: new Date(),
        });

        return true;
    },
    cancelRequest: function(patient, doctor) {
        var req = Requests.findOne({patientId: patient._id});
        var hasRequest;

        Meteor.call("hasRequest", patient,doctor, function(error, result){
            if(error){
                console.log("error", error);
            }
            if(result){
                hasRequest = result;
            }
        });

        if (!hasRequest) {
            return false;
        }

        Requests.remove({_id: req._id});
        return true;
    },
    hasRequest: function(patient, doctor) {
        var req = Requests.findOne({patientId: patient._id});
        if (typeof req === "undefined") {
            return false;
        }

        if (req.doctorId === doctor._id) {
            return true;
        }

        return true;
    },
    rejectRequest: function(_id) {
        Requests.update(_id, {$set: {
            rejected: true,
        }});
    },
    acceptRequest: function(_id) {
        req = Requests.findOne({_id: _id});

        Meteor.users.update(req.patientId,  { $set: {
            "patient.doctorId": req.doctorId,
        }});
        Requests.update(_id, {$set: {
            accepted: true,
        }});
    },
    reRequest: function(patient, doctor) {
        Requests.update({
            patientId: patient._id,
            doctorId: doctor._id,
        }, {$set: {
            rejected: false,
        }});
    }
});
