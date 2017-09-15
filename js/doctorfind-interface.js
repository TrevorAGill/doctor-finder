var apiKey = require('./../.env').apiKey;
import { doctorFind } from './../js/doctorfind.js';

$(document).ready(function() {
  $('#findDoctors').submit(function(event) {
    event.preventDefault();
    $(".results").html("");
    let zipcode = $('#zipcode').val();
    let doctorName = $('#doctor').val();
    let issue = $('#medicalIssue').val();
    doctorFind.retrieveDocInfo(doctorName, issue, (simpleDocArray) => {
      simpleDocArray.forEach((doctor) => {
        $(".results").append('<strong>Name: ' + doctor.firstName + ' ' + doctor.lastName + '</strong><br>');
        $(".results").append('Address: ' + doctor.address + '<br>');
        $(".results").append('Phone #: ' + doctor.phone + '<br>');
        $(".results").append('Website: ' + doctor.website + '<br>');
        $(".results").append('Accepting New Patients: ' + doctor.acceptingNewPatients + '<br><br>');
      });
    });
  });
});
