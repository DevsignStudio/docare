Meteor.startup(function(){
    Template.patientActivityLayout.events({
        "click #weight": function(event, template){
            console.log(Meteor.user().getPatientLatestData("weight"));
        }
    });

});
