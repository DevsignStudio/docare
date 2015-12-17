Appointment = new Mongo.Collection("appointments");

Appointment.helpers({
    patient: function() {
        return Meteor.users.findOne(this.patientId);
    },
    getRequestAtDate: function() {
        var date = this.requestAt;
        return date.toDateString();
    },
    getRequestAtTime: function() {
        return this.requestAt.toLocaleTimeString();
    }
});

Meteor.methods({
    newAppointment:function(patientId, date){
        user = Meteor.users.findOne(patientId);

        if (!user) {
            throw new Meteor.Error(500,
                                   'Error 500: Not found',
                                   'the document is not found');
        }

        Appointment.insert({
            patientId: user._id,
            doctorId: user.patient.doctorId,
            requestAt: date,
            accepted: false,
            rejected: false,
            reschedule: false,
            createdAt: new Date(),
        });

        return true;
    },
    acceptAppointment: function(_id) {
        Appointment.update({
            _id: _id
        }, {$set: {
            accepted: true,
            updatedAt: new Date(),
        }});
    },
    rejectAppointment: function(_id) {
        Appointment.update({
            _id: _id
        }, {$set: {
            rejected: true,
            updatedAt: new Date(),
        }});
    }

});
