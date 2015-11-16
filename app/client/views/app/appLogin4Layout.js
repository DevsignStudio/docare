Meteor.startup(function(){
    Template.appLogin4Layout.helpers({
        rendered: function(){
            Session.set("selectedImg", 1);
        }
    });

    Template.appLogin4Layout.events({
        "click .img-choose": function(event, template){
            $(event.target).addClass("active");
            if ($(event.target).hasClass("patient")) {
                $(".img-choose.doctor").removeClass("active");
                Session.set("selectedImg", "1");
            } else {
                $(".img-choose.patient").removeClass("active");
                Session.set("selectedImg", "2");
            }
        },
        "click #finish4": function(event, template) {
            event.preventDefault();
            var username = Meteor.user().username;
            console.log(Session.get("selectedImg"));
            var user = {
                "profile.accountType" : Session.get("selectedImg")
            };
            Meteor.call("updateUser",username, user);
        }
    });
});
