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
    template: 'appLogin4Layout'
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
