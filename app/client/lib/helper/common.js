UI.registerHelper("formatDateTime", function(context, options){
    if (context) {
        return moment(context).format('MM/DD/YYYY, hh:mm');
    }
});

UI.registerHelper("userIsLogin", function(){
    if (Meteor.user() !== null) {
        return true;
    }
    return false;
});

UI.registerHelper("loginUser", function(){
    if (Meteor.user() !== null) {
        user = Meteor.user();
        if (user.patient === undefined) {
            user.hasDoctor = false;
        } else {
            user.hasDoctor = true;
        }
        return user;
    }
});
