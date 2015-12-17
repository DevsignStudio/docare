PatientController = BaseController.extend({
    yieldTemplates: {
        'defaultToolbar': {
            to: 'toolbar'
        },
        'patientNavigation': {
            to: "navigation"
        }
    },
    onBeforeAction: function() {
        this.subscribe('users').wait();

        if (typeof Meteor.user() !== "undefined") {
            if (!Meteor.user().hasPatientData()) {
                if (Router.current().route.path() !== "/patient/my-details") {
                    Router.go("/patient/my-details/");
                }
            }
            if (this.ready()) {
                this.next();
            }

        }


    }
});
