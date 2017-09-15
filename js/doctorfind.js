var apiKey = require('./../.env').apiKey;
export let doctorFind = {

  constructURL: function(zipcode, doctorName, issue) {
    if (zipcode) {
      var coordinates = this.convertZipcodeToCoordinates(zipcode);
      console.log("this is value of var coordinates: " + coordinates)
      return `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=${coordinates}%2C100&user_location=${coordinates}&skip=0&limit=30&user_key=${apiKey}`;
    };
  },

  retrieveDocInfo: function(doctorName, issue, fn) {
    $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${issue}&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7`,
      data: {
        format: 'json'
      },
      type: 'GET',
      success: (response) => {
        let arrayOfDocs = response.data;
        let simpleDocArray = this.parseDocArray(arrayOfDocs);
        fn(simpleDocArray);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert('An error occurred... Look at the console (F12 or Ctrl+Shift+I, Console tab) for more information!');

        $('#result').html('<p>status code: ' + jqXHR.status + '</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>' + jqXHR.responseText + '</div>');
        console.log('jqXHR:');
        console.log(jqXHR);
        console.log('textStatus:');
        console.log(textStatus);
        console.log('errorThrown:');
        console.log(errorThrown);
      }
    });
  },

  parseDocArray(arrayOfDocs) {
    let simpleDocArray = [];
    arrayOfDocs.forEach((doctorArray) => {
      let newDoc = {
        firstName: doctorArray.profile.first_name,
        lastName: doctorArray.profile.last_name,
        address: doctorArray.practices[0].visit_address.street + ', ' + doctorArray.practices[0].visit_address.city + ', ' + doctorArray.practices[0].visit_address.state,
        phone: doctorArray.practices[0].phones[0].number,
        website: doctorArray.practices[0].website,
        acceptingNewPatients: doctorArray.practices[0].accepts_new_patients
      };
      simpleDocArray.push(newDoc);
    })
    console.log(simpleDocArray);
    return simpleDocArray;
  }

}
// `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=${coordinates}%2C100&user_location=${coordinates}&skip=0&limit=30&user_key=${apiKey}`


//Example search by issue: https://api.betterdoctor.com/2016-03-01/doctors?query=acne&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7

//Example search by name: https://api.betterdoctor.com/2016-03-01/doctors?name=smith&query=&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7

//Example search by both (either one can be blank): https://api.betterdoctor.com/2016-03-01/doctors?name=smith&query=acne&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7
