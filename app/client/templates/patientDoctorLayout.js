Meteor.startup(function(){
    Template.patientDoctorLayout.events({
        "click #request": function(event, template){
            var controller = Iron.controller();
            var doctor = Meteor.users.findOne({_id: controller.state.get('profileId')});

            if (Meteor.user().hasRequest( Meteor.user().requestDoctor() )) {
                if (Requests.findOne({patientId: Meteor.userId()}).rejected) {
                    Meteor.call("reRequest", Meteor.user(), Meteor.user().requestDoctor());
                } else {
                    Meteor.call("cancelRequest", Meteor.user(), Meteor.user().requestDoctor());
                }
            } else {
                Meteor.call("sendRequest", doctor.username);
            }
        }
    });

    Template.patientDoctorLayout.helpers({
        isRequested : function() {
            if (Meteor.user().hasRequest( Meteor.user().requestDoctor() )) {
                return true;
            }
            return false;
        },
        isRejected: function() {
            return Requests.findOne({patientId: Meteor.userId()}).rejected;
        }
    });
});
