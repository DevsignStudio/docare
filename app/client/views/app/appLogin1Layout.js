
Meteor.startup(function(){
    Template.appLogin1Layout.helpers({
        create: function(){

        },
        rendered: function(){

        },
        destroyed: function(){

        },
    });

    Template.appLogin1Layout.events({
        "submit #loginForm1" : function(event) {
            event.preventDefault();
            var phoneNumber = event.target.phoneNumber.value;

            Session.set("phoneNumber", phoneNumber);
            Router.go("/login-2");
        }
    });
});
