Meteor.startup(function(){
    Template.doctorSessionRequestsListLayout.events({
        "click #request": function(event, template){

        }
    });

    Template.doctorSessionRequestsListLayout.helpers({
        appointments: function() {
            Meteor.user().getMyAppoinments().forEach(function(ad) {
                console.log(ad);
            });
            return Meteor.user().getMyAppoinments();
        }
    });

});


Meteor.startup(function(){
    Template.sessionRequestDisplay.events({
        "click #reject": function(event, template){
            Meteor.call("rejectRequest", this._id);
        },
        "click #accept": function(event, template){
            Meteor.call("acceptRequest", this._id);
        }
    });
});
