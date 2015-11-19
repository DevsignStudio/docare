Meteor.startup(function(){
    Template.appLogin4Layout.events({
        "click .img-choose": function(event, template){
            $(event.target).addClass("active");
            if ($(event.target).hasClass("patient")) {
                $(".img-choose.doctor").removeClass("active");
                Session.set("selectedImg", 1);
            } else {
                $(".img-choose.patient").removeClass("active");
                Session.set("selectedImg", 2);
            }
        },
        "click #finish4": function(event, template) {
            event.preventDefault();
            var username = Meteor.user().username;
            var user = {
                "profile.accountType" : Session.get("selectedImg")
            };
            Meteor.call("updateUser",username, user);

            if (Session.get("selectedImg") === 1) {
                Router.go("/patient/", {}, {replaceState: true});
            } else if (Session.get("selectedImg") === 2) {
                Router.go("/doctor/", {}, {replaceState: true});
            }

        }
    });
});
