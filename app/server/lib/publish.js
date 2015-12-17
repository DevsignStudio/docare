Meteor.publish("users", function(){
    return Meteor.users.find();
});

Meteor.publish("requests", function(){
    return Requests.find({
        $or: [
            {patientId: this.userId},
            {
                doctorId: this.userId,
                rejected: {$ne: true},
                accepted: {$ne: true},
            },
        ]
    });
});

Meteor.publish("patientsdata", function(){
    user = Meteor.users.findOne({_id: this.userId});
    if (user.profile.accountType === 1) {
        return PatientData.find({patientId: user._id});
    } else {
        myPatients = Meteor.users.find({"patient.doctorId": user._id});
        patientsId = [];
        myPatients.forEach(function(u){
            patientsId.push({
                patientId: u._id,
            });
        });

        return PatientData.find({
            $or: patientsId
        });
    }
});

Meteor.publish("appointments", function(){
    return Appointment.find({
        $or: [
            {patientId: this.userId},
            {
                doctorId: this.userId,
                accepted: {$ne: true},
                rejected: {$ne: true},
            },
        ]
    });
});
// twilio = Twilio("ACdb67f64ff831fff07a60c72eb1697246", "4606bec5540c03eb81b54741d2e0cd06");
// twilio.sendSms({
//   to:'+60129252858', // Any number Twilio can deliver to
//   from: '', // A number you bought from Twilio and can use for outbound communication
//   body: 'fuck you.' // body of the SMS message
// }, function(err, responseData) { //this function is executed when a response is received from Twilio
//   if (!err) { // "err" is an error received during the request, if any
//     // "responseData" is a JavaScript object containing data received from Twilio.
//     // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//     // http://www.twilio.com/docs/api/rest/sending-sms#example-1
//     console.log(responseData.from); // outputs "+14506667788"
//     console.log(responseData.body); // outputs "word to your mother."
// } else {
//     console.log("err");
// }
// });


// Nexmo.initialize('dd499887', 'f8c59eb9', 'http', true);
//
// Nexmo.sendTextMessage("NEXMO", "+60129252858", "Hello World");
