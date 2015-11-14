
Meteor.startup(function(){
    Template.appLogin3Layout.helpers({
        create: function(){

        },
        rendered: function(){

        },
        destroyed: function(){

        },
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
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            }, function(error, data) {
                Imgur.upload({
                    apiKey: "5a52b727e6145ac",
                    image: data
                }, function(e, d){
                    var thumbs = Imgur.toThumbnail(d.link, Imgur.BIG_SQUARE);
                    $("#imageGet").attr("src", thumbs);
                });
            });
        }
    });

});
