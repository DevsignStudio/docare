DoctorController = BaseController.extend({
    yieldTemplates: {
        pinkToolbar: {to: 'toolbar'},
        doctorNavigation: {to: 'navigation'},
    },
    onBeforeAction: function() {
        this.subscribe('users').wait();

        if (typeof Meteor.user() !== "undefined") {
            if (this.ready()) {
                this.next();
            }
        }
    }
});
