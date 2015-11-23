LoginController = BaseController.extend({
    yieldTemplates: {
        'noToolbar': {
            to: 'toolbar'
        },
    },
    onBeforeAction: function() {
        if (Meteor.userId() !== null) {
            if (Meteor.user().profile.accountType === 1) {
                Router.go("/patient/");
            } else if(Meteor.user().profile.accountType === 2) {
                Router.go("/doctor/");
            }
            this.next();
        } else {
            this.next();
        }
    }
});
