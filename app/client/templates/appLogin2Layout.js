Meteor.startup(function() {
    Template.appLogin2Layout.helpers({
        phoneNumber: function() {
            return Session.get("phoneNumber");
        }
    });

    Template.appLogin2Layout.events({
        "submit #loginForm2": function(event) {
            event.preventDefault();
            Meteor.call("usernameExists",Session.get("phoneNumber"), function(err,data) {
                if (err)
                    console.log("err");

                Session.set("existsID", data);
            });

            Router.go("/login-3");
        }
    });
});
