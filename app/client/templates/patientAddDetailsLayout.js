Meteor.startup(function(){
    Template.patientAddDetailsLayout.helpers({

    });

    Template.patientAddDetailsLayout.events({
        "submit #firstData": function(event, template){
            event.preventDefault();
            var weight = event.target.weight.value;
            var height = event.target.height.value;
            var birthday = event.target.birthday.value;

            if (weight === "" || height === "" || birthday === "") {

            } else {
                Meteor.call("updateUser", Meteor.user().username, {
                    "profile.birthday" : new Date(birthday),
                });

                Meteor.call("addPatientData", Meteor.user().username, {
                    weight:  weight,
                    height: height,
                });

                Router.go("/patient");
            }
        }
    });
});
