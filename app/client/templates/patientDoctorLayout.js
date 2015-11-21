Meteor.startup(function(){
    Template.patientDoctorLayout.events({
        "click #request": function(event, template){
            console.log(Meteor.users.findOne().hello());
        }
    });
});
