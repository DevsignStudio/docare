Meteor.startup(function(){
    Template.doctorMyProfileCards.onRendered(function(e) {
        this.$(".cards").fadeIn( "slow", function() {
            // Animation complete
        });
    })

    Template.doctorMyProfileCards.onDestroyed(function(e) {

    })

    Template.doctorMyProfileCards.events({
        "click #accept": function(event, template){
            var self = this;
            template.$(".cards").fadeOut( "slow", function() {
                $(this).remove();
                Meteor.call("acceptAppointment", self._id);
            });
        } ,

        "click #reject": function(event, template){
            var self = this;
            template.$(".cards").fadeOut( "slow", function() {
                $(this).remove();
                Meteor.call("rejectAppointment", self._id);
            });
        }
    });
});
