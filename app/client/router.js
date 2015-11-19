Router.route('/', {
    controller: 'DocareLoginController',
    template: 'appLogin1Layout'
});

Router.route('/login-2', {
    controller: 'DocareLoginController',
    template: 'appLogin2Layout'
});

Router.route('/login-3', {
    controller: 'DocareLoginController',
    template: 'appLogin3Layout'
});

Router.route('/login-4', {
    controller: 'DocareLoginController',
    template: 'appLogin4Layout',
    onAfterAction: function() {
        if (Meteor.user() !== null) {
            Session.set("selectedImg", 1);
            if (Meteor.user().profile.accountType === 1) {
                Router.go("/patient/", {replaceState: true});
            } else if (Meteor.user().profile.accountType === 2) {
                Router.go("/doctor/", {replaceState: true});
            }
        }
    }
});

Router.route('/patient/', {
    controller: 'PatientController',
    template: 'patientActivityLayout'
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

Router.route('/patient/doctor/', {
    controller: 'PatientController',
    template: 'patientDoctorLayout'
});

Router.route('/patient/my-doctor/', {
    controller: 'PatientController',
    template: 'patientMyDoctorLayout'
});

Router.route('/doctor/', {
    controller: 'DocareDoctorController',
    template: 'doctorMyProfileLayout'
});

Router.route('/doctor/my-patient/', {
    controller: 'DocareDoctorController',
    template: 'doctorMyPatientLayout'
});

Router.route('/doctor/add-requests/', {
    controller: 'DocareDoctorController',
    template: 'doctorAddRequestsLayout'
});

Router.route('/doctor/patient-profile', {
    controller: 'DocareDoctorController',
    template: 'doctorPatientProfileLayout'
});

Router.route('/doctor/conversation/:_id', {
    controller: 'DocareDoctorController',
    template: 'doctorConversationLayout',
});
