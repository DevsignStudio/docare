Meteor.users.find();

// Meteor.users.forEach(function(user, index){
//     console.log(user);
// });


Meteor.users.helpers({
    hello: function(arg) {
        return this._id;
    },
    hasDoctor: function() {
        if (typeof this.patient === "undefined") {
            return false;
        } else {
            return true;
        }
    },
    getDoctorRequests : function() {
        if (this.profile.accountType == 1) {
            return Request.find({doctorId: this._id});
        }
        return null;
    },
    hasRequest: function(doctor) {
        var req = Requests.findOne({patientId: this._id});
        if (typeof req === "undefined") {
            return false;
        }

        if (req.doctorId === doctor._id) {
            return true;
        }

        return true;
    },
    requestDoctor: function() {
        var req = Requests.findOne({patientId: this._id});

        if (typeof req === "undefined") {
            return false;
        }

        return Meteor.users.findOne({_id: req.doctorId});
    },
    patients: function() {
        if (this.profile.accountType === 1) {
            return null;
        }
        return Meteor.users.find({"patient.doctorId": this._id});
    },
    hasPatientData: function() {
        if (this.profile.accountType === 2) {
            return false;
        }

        $data= PatientData.findOne({patientId:this._id});

        if (typeof $data === "undefined") {
            return false;
        }

        return true;
    },
    getPatientLatestData: function(dataName) {
        datas = PatientData.find({patientId: this._id}, {sort: {createdAt: 1}});
        var result;
        datas.forEach(function(res) {
            if (typeof res.data[dataName] !== undefined) {
                result = res.data[dataName];
                return;
            }
        });

        return result;
    },
    getMyAppoinments: function() {
        return Appointment.find({}, {sort: {createdAt: -1, updatedAt: -1}});
    }
});



Meteor.methods({
    addUser: function(data) {
        Accounts.createUser(data);
    },
    updateUser: function(username, data) {
        var userExistsId = Meteor.users.findOne({
            "username": username
        });
        if (userExistsId !== undefined) {
            Meteor.users.update({
                _id: userExistsId._id
            }, {
                $set: data
            });
            Meteor.users.update({
                _id: userExistsId._id
            }, {
                $set: {
                    "profile.updatedAt": new Date()
                }
            });
            return true;
        }
        return false;
    },
    usernameExists: function(username) {
        var userExistsId = Meteor.users.findOne({
            "username": username
        });
        if (typeof userExistsId !== "undefined") {
            return userExistsId._id;
        }

        return undefined;
    },
    doctorFromDocpin: function(dp) {
        var userExistsDP = Meteor.users.findOne({
            "doctor.docpin": dp
        });
        if (typeof userExistsDP !== "undefined") {
            return userExistsDP._id;
        }
        return false;
    },
    userFindById: function(id) {
        var user = Meteor.users.findOne({
            "_id": id
        });

        return user;
    },
    makeDocpin: function() {
        var text = "DR";
        var possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var possibleNumber = "0123456789";

        while(true) {
            for (var i = 0; i < 3; i++)
                text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));

            for (var j = 0; j < 3; j++)
                text += possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length));

            var userExistsDP = Meteor.users.findOne({
                "doctor.docpin": text
            });

            if (typeof userExistsDP === "undefined") {
                return text;
            }

            text = "DR";
        }
    }
});
