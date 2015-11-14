Meteor.startup(function() {
    Template.appLogin3Layout.helpers({
        create: function() {

        },
        rendered: function() {

        },
        destroyed: function() {

        },
        name: function() {
            var id = Session.get("existsID");
            if (id !== undefined) {
                var user = Meteor.users.findOne({
                    "_id": id
                });
                return user.profile.name;
            }
        },
        profileImage: function() {
            var id = Session.get("existsID");
            if (id !== undefined) {
                var user = Meteor.users.findOne({
                    "_id": id
                });
                return user.profile.image;
            }

            return "/img/profile.png";
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
                "width": 200,
                "height": 200,
                "quality": 100,
                "sourceType": Camera.PictureSourceType.PHOTOLIBRARY
            }, function(error, data) {
                Imgur.upload({
                    apiKey: "5a52b727e6145ac",
                    image: data
                }, function(e, d) {
                    var thumbs = Imgur.toThumbnail(d.link, Imgur.BIG_SQUARE);
                    $("#imageGet").attr("src", thumbs);
                });
            });
        },
        "submit #loginForm3": function(event) {
            event.preventDefault();
            var name = event.target.name.value;
            var username = Session.get("phoneNumber");

            if (Session.get("existsID")) {
                Meteor.loginWithPassword(username, "abc123");
            } else {
                convertToDataURLviaCanvas($("#imageGet").attr("src"), function(base64Img) {
                    var user = {
                        "username": username,
                        "password": "abc123",
                        "profile": {
                            "name": name,
                            "image": base64Img,
                            "type": 1,
                            "createdAt": new Date(),
                            "updatedAt": new Date(),
                            "loginAt": null,
                        }
                    };
                    console.log(base64Img);
                    Meteor.call("addUser", user);
                    Meteor.loginWithPassword(username, "abc123");
                });
            }
        }
    });
});
