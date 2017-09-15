var apiKey = require('./../.env').apiKey;
import { doctorFind } from './../js/doctorfind.js';

// import {DoctorFind} from './../js/doctorfind.js';
// var DoctorFind = require('./../js/doctorfind.js').doctorFindModule;

$(document).ready(function () {
  $('#findDoctors').submit(function (event) {
    event.preventDefault();

    let zipcode = $('#zipcode').val();
    let doctorName = $('#doctor').val();
    let issue = $('#medicalIssue').val();
    doctorFind.executePromises(zipcode, doctorName, issue);
    // let url = doctorFind.convertZipcodeToCoordinates(zipcode,doctorName,issue);
    // console.log(url);
  });
});


// getAPIData(url,fn) {
//    $.ajax({
//      url: url,
//      data: {
//        format: 'json'
//      },
//      type: 'GET',
//      success: (response) => {
//        let bikesArray = response.bikes;
//        let simpleBikeArray = this.parseBikeArray(bikesArray);
//        fn(simpleBikeArray);
//      },
//      error: function(jqXHR, textStatus, errorThrown) {
//               alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');
//
//               $('#result').html('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
//               console.log('jqXHR:');
//               console.log(jqXHR);
//               console.log('textStatus:');
//               console.log(textStatus);
//               console.log('errorThrown:');
//               console.log(errorThrown);
//           }
//    });
//  }

 // Should display:
 //  first name
 //  last name
 //  address
 //  phone
 //  website
 //  accepting new patients?
