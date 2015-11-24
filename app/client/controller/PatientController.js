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
        // if (Router.current().route.path() !== "/patient/my-details") {
        //     Router.go("/patient/my-details/");
        // }
        this.subscribe('users').wait();
        if (this.ready()) {
            this.next();
        }
    }
});
