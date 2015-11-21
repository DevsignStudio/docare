Meteor.startup(function(){
    Template.searchDoctorToolbar.events({
        "submit #searchDocpin": function(event, template){
            event.preventDefault();
            var docpin = event.target.docpin.value;
            Meteor.call("doctorFromDocpin", docpin, function(err,data) {
                if (data !== false) {
                    Router.go("/profile/" + data);
                }
            });
        }
    });
});
