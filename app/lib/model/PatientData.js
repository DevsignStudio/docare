PatientData = new Mongo.Collection("patientsdata");

Meteor.methods({
    addPatientData:function(username, data){
        user = Meteor.users.findOne({username: username});

        PatientData.insert({
            patientId: user._id,
            data: data,
            createdAt: new Date(),
        });
    },
    // getPatientLatestData: function(patientId, dataToFind) {
    //     datas = PatientData.find({patientId: patientId}, {sort: {createdAt: -1}});
    //     var result;
    //     datas.forEach(function(res) {
    //         if (typeof res.data[dataToFind] !== undefined) {
    //             result = res.data[dataToFind];
    //             return;
    //         }
    //     });
    //
    //     return result;
    // }

});
