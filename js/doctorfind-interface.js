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
        $(".results").append('<div class="panel panel-default"><div class="panel-heading"><strong>' + doctor.firstName + ' ' + doctor.lastName + '</strong></div><div class="panel-body">Address: ' + doctor.address + '<br> Phone #: ' + doctor.phone + '<br> Website: ' + doctor.website + '<br> Accepting New Patients: ' + doctor.acceptingNewPatients + '</div>');
      });
    });
  });
});
