Router.route('/', {
    controller: 'DocareLoginController',
    template: 'docareLogin1Layout'
});

Router.route('/login-2', {
    controller: 'DocareLoginController',
    template: 'docareLogin2Layout'
});

Router.route('/login-3', {
    controller: 'DocareLoginController',
    template: 'docareLogin3Layout'
});

Router.route('/login-4', {
    controller: 'DocareLoginController',
    template: 'docareLogin4Layout'
});

Router.route('/patient/', {
    controller: 'PatientController',
    template: 'patientActivityLayout'
});

Router.route('/patient/search-doctor', {
    controller: 'PatientController',
    template: 'patientSearchDoctorLayout',
    yieldTemplates: {
       'searchDoctorToolbar': {to: 'toolbar'},
       'patientNavigation': {to: "navigation"}
    }
});

Router.route('/patient/doctor/', {
    controller: 'PatientController',
    template: 'patientDoctorLayout'
});

Router.route('/patient/my-doctor/', {
    controller: 'PatientController',
    template: 'patientMyDoctorLayout'
});

Router.route('/docare/user-activity-2', {
    controller: 'BaseController',
    template: 'docareUserActivity2Layout'
});

Router.route('/docare/user-doctor-profile', {
    controller: 'BaseController',
    template: 'docareUserDoctorProfileLayout'
});

Router.route('/docare/user-doctor-profile-2', {
    controller: 'BaseController',
    template: 'docareUserDoctorProfile2Layout'
});

Router.route('/docare/doctor-profile', {
    controller: 'DocareDoctorController',
    template: 'docareDoctorProfileLayout'
});

Router.route('/docare/patient-profile', {
    controller: 'DocareDoctorController',
    template: 'docarePatientProfileLayout'
});
