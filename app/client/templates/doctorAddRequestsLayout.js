Meteor.startup(function(){
    Template.doctorAddRequestsLayout.events({
        "click #request": function(event, template){

        }
    });

    Template.doctorAddRequestsLayout.helpers({
        requests: function() {
            return Requests.find({});
        }
    });

});


Meteor.startup(function(){
    Template.addRequestDisplay.events({
        "click #reject": function(event, template){
            Meteor.call("rejectRequest", this._id);
        },
        "click #accept": function(event, template){
            Meteor.call("acceptRequest", this._id);
        }
    });
});
