Router.route('/', {
    controller: 'LoginController',
    template: 'appLogin1Layout'
});

Router.route('/login-2', {
    controller: 'LoginController',
    template: 'appLogin2Layout'
});

Router.route('/login-3', {
    controller: 'LoginController',
    template: 'appLogin3Layout'
});

Router.route('/login-4', {
    controller: 'LoginController',
    template: 'appLogin4Layout',
    onAfterAction: function() {
        console.log(Meteor.user());
        if (Meteor.user() !== null) {
            Session.set("selectedImg", 1);
            if (typeof Meteor.user().profile !== "undefined") {
                if (Meteor.user().profile.accountType === 1) {
                    Router.go("/patient/", {replaceState: true});
                } else if (Meteor.user().profile.accountType === 2) {
                    Router.go("/doctor/", {replaceState: true});
                }
            }
        }
    }
});

Router.route('/patient/', {
    controller: 'PatientController',
    template: 'patientActivityLayout',
});

Router.route('/patient/my-details', {
    controller: 'PatientController',
    template: 'patientAddDetailsLayout',
    yieldTemplates: {
        'myDetailsToolbar': {to: 'toolbar'}
    }
});

Router.route('/patient/2/', {
    controller: 'PatientController',
    template: 'patientActivity2Layout'
});

Router.route('/patient/search-doctor', {
    controller: 'PatientController',
    template: 'patientSearchDoctorLayout',
    yieldTemplates: {
        'searchDoctorToolbar': {to: 'toolbar'},
        'patientNavigation': {to: "navigation"}
    }
});

Router.route('/patient/conversation', {
    controller: 'PatientController',
    template: 'patientConversationLayout',
});


Router.route('/profile/:_id', {
    controller: "PatientController",
    template: 'patientDoctorLayout',
    yieldTemplates: {
        'patientBackToActivityToolbar': {to: 'toolbar'},
        'patientNavigation': {to: "navigation"}
    },
    data: function() {
        return Meteor.users.findOne({_id: this.params._id});
    },
    onBeforeAction: function() {
        this.subscribe('users').wait();

        if (typeof Meteor.user() !== "undefined") {
            this.state.set('profileId', this.params._id);
            if (Meteor.user().profile.accountType === 1) {
                if (typeof Meteor.user().patient === "undefined") {
                    this.next();
                } else {
                    if (Meteor.user().patient.doctorID === this.params._id) {
                        this.render("defaultToolbar", {to: 'toolbar'});

                        this.next();
                    } else {
                        Router.go("/patient");
                    }
                }

            } else {
                this.render("pinkToolbar", {to: 'toolbar'});
                this.render("doctorNavigation", {to: "navigation"});
                this.render("doctorPatientProfileLayout");
            }
        }
    }
});

Router.route('/patient/my-doctor/', {
    controller: 'PatientController',
    template: 'patientMyDoctorLayout'
});

Router.route('/patient/set-session/', {
    controller: 'PatientController',
    template: 'patientSetSessionLayout'
});

Router.route('/doctor/', {
    controller: 'DoctorController',
    template: 'doctorMyProfileLayout'
});

Router.route('/doctor/my-patient/', {
    controller: 'DoctorController',
    template: 'doctorMyPatientLayout'
});

Router.route('/doctor/add-requests/', {
    controller: 'DoctorController',
    template: 'doctorAddRequestsLayout'
});

Router.route('/doctor/session-requests/', {
    controller: 'DoctorController',
    template: 'doctorSessionRequestsListLayout'
});

Router.route('/doctor/patient-profile', {
    controller: 'DoctorController',
    template: 'doctorPatientProfileLayout'
});

Router.route('/doctor/conversation/', {
    controller: 'DoctorController',
    template: 'doctorConversationListLayout',
});

Router.route('/doctor/conversation/:_id', {
    controller: 'DoctorController',
    template: 'doctorConversationLayout',
});

Router.route('/doctor/reschedule-session', {
    controller: 'DoctorController',
    template: 'doctorRescheduleSessionLayout'
});
