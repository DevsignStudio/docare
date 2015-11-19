Meteor.methods({
    addUser: function(data) {
        Accounts.createUser(data);
    },
    updateUser: function(username, data) {
        var userExistsId = Meteor.users.findOne({
            "username": username
        });
        if (userExistsId !== undefined) {
            Meteor.users.update({
                _id: userExistsId._id
            }, {
                $set: data
            });
            Meteor.users.update({
                _id: userExistsId._id
            }, {
                $set: {
                    "profile.updatedAt": new Date()
                }
            });
            return true;
        }
        return false;
    },
    usernameExists: function(username) {
        var userExistsId = Meteor.users.findOne({
            "username": username
        });
        if (typeof userExistsId !== "undefined") {
            return userExistsId._id;
        }

        return undefined;
    },
    doctorFromDocpin: function(dp) {
        var userExistsDP = Meteor.users.findOne({
            "doctor.docpin": dp
        });
        if (typeof userExistsDP !== "undefined") {
            return userExistsDP._id;
        }
        return false;
    },
    userFindById: function(id) {
        var user = Meteor.users.findOne({
            "_id": id
        });

        return user;
    },
    makeDocpin: function() {
        var text = "DR";
        var possibleString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var possibleNumber = "0123456789";

        while(true) {
            for (var i = 0; i < 3; i++)
                text += possibleString.charAt(Math.floor(Math.random() * possibleString.length));

            for (var j = 0; j < 3; j++)
                text += possibleNumber.charAt(Math.floor(Math.random() * possibleNumber.length));

            var userExistsDP = Meteor.users.findOne({
                "doctor.docpin": text
            });

            if (typeof userExistsDP === "undefined") {
                return text;
            }

            text = "DR";
        }
    }
});
