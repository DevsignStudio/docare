Meteor.methods({
    addUser: function(data) {
        Accounts.createUser(data);
    },
    usernameExists: function(username) {
        var userExistsId = Meteor.users.findOne({"username": username});
        if (userExistsId !== undefined) {
            console.log(userExistsId._id);
            return userExistsId._id;
        }

        return undefined;
    },
    userFindById: function(id) {
        var user = Meteor.users.findOne({"_id": id});

        return user;
    }
});
