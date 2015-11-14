
Meteor.startup(function(){
    Template.appLogin3Layout.helpers({
        create: function(){

        },
        rendered: function(){

        },
        destroyed: function(){

        },
        name: function() {
            var id = Session.get("existsID");
            if (id !== undefined) {
                var user = Meteor.users.findOne({"_id": id});
                return user.profile.name;
            }

        }
    });

    Template.appLogin3Layout.events({
        "click #imageGet": function(event) {
            event.preventDefault();
            if (!navigator.camera) {
                alert("Camera API not supported", "Error");
                return;
            }

            MeteorCamera.getPicture({
                "width" : 200,
                "height" : 200,
                "quality" : 100,
                "sourceType" : Camera.PictureSourceType.PHOTOLIBRARY
            }, function(error, data) {
                Imgur.upload({
                    apiKey: "5a52b727e6145ac",
                    image: data
                }, function(e, d){
                    var thumbs = Imgur.toThumbnail(d.link, Imgur.BIG_SQUARE);
                    $("#imageGet").attr("src", thumbs);
                });
            });
        },
        "submit #loginForm3" : function(event) {
            event.preventDefault();
            var name = event.target.name.value;
            var username = Session.get("phoneNumber");

            if ( Session.get("existsID")) {
                
            } else {
                var user = {
                    "username": username,
                    "password":"abc123",
                    "profile": {
                        "name": name,
                        "image" : $("#imageGet").attr("src"),
                        "type": 1,
                        "createdAt": new Date(),
                        "updatedAt": new Date(),
                        "loginAt": null,
                    }
                };
                console.log(Session.get("phoneNumber"));
                Meteor.call("addUser", user);
            }
            Meteor.loginWithPassword(username,"abc123");
        }
    });
});
