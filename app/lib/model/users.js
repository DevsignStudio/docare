Meteor.users.find();

// Meteor.users.forEach(function(user, index){
//     console.log(user);
// });

Meteor.users.helpers({
    hello: function() {
        return "Hello World";
    },
    hasDoctor: function() {
        if (typeof this.patient === "undefined") {
            return false;
        } else {
            return true;
        }
    }
});
