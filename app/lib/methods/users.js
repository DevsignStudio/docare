Meteor.methods({
    addUser: function(data) {
        Accounts.createUser(data);
    },
    updateUser: function(username,data) {
        var userExistsId = Meteor.users.findOne({"username": username});
        if (userExistsId !== undefined) {
            Meteor.users.update({_id: userExistsId._id}, {$set:data});
            Meteor.users.update({_id: userExistsId._id}, {$set:{
                "profile.updatedAt" : new Date()
            }});
            return true;
        }
        return false;
    },
    usernameExists: function(username) {
        var userExistsId = Meteor.users.findOne({"username": username});
        if (userExistsId !== undefined) {
            return userExistsId._id;
        }

        return undefined;
    },
    userFindById: function(id) {
        var user = Meteor.users.findOne({"_id": id});

        return user;
    }
});
