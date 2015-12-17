Meteor.startup(function(){
    Template.doctorMyPatientLayout.helpers({
        patients: function() {
            console.log(Meteor.user().patients());
            return Meteor.user().patients();
        }
    });
});
