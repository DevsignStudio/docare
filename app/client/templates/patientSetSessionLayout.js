Meteor.startup(function(){
    Template.patientSetSessionLayout.events({
        "submit #setSession": function(event, template){
            event.preventDefault();
            var sessionDate = event.target.sessionDate.value;
            var sessionTime = event.target.sessionTime.value;

            // console.log(new Date(sessionDate + " , " + sessionTime + ":00:00"));

            Meteor.call("newAppointment", Meteor.userId(),
                        new Date(sessionDate + " , " + sessionTime + ":00:00"),
                        function(error, result) {
                if(error){
                    console.log("error", error);
                }
                if(result){

                }
            });

        }
    });
});
