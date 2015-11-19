
Meteor.startup(function(){
    Template.appLogin1Layout.events({
        "submit #loginForm1" : function(event) {
            event.preventDefault();
            var phoneNumber = event.target.phoneNumber.value;

            Session.set("phoneNumber", phoneNumber);
            Router.go("/login-2");
        },

    });

    document.addEventListener("backbutton", function() {
        if (history.state && history.state.initial === true) {
            navigator.app.exitApp();
        } else {
            history.go(-1);
        }
    });
});
