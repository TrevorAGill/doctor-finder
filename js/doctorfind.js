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
        this.evaluateIfNoResults(arrayOfDocs);
        let cleanArray = this.cleanUpArrayData(arrayOfDocs);
        let simpleDocArray = this.parseDocArray(cleanArray);
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

  evaluateIfNoResults(arrayOfDocs) {
    if(arrayOfDocs.length === 0){
      alert("No doctors match your search query");
    }
  },

  cleanUpArrayData(arrayOfDocs) {
    let withPractices = arrayOfDocs.filter((doctorArray) => doctorArray.practices.length > 0);
    withPractices.forEach((doctorArray) => {
      if (doctorArray.practices[0].phones[0].number.length === 10) {
        let x = doctorArray.practices[0].phones[0].number;
        doctorArray.practices[0].phones[0].number =
          x.slice(0, 3) + '-' + x.slice(3, 6) + '-' + x.slice(6);
      };
      if (doctorArray.practices[0].accepts_new_patients) {
        doctorArray.practices[0].accepts_new_patients = "yes";
      } else {
        doctorArray.practices[0].accepts_new_patients = "no";
      };
      if (!doctorArray.practices[0].website) {
        doctorArray.practices[0].website = "none listed";
      };
    });
    return withPractices;
  },

  parseDocArray(cleanArray) {
    let simpleDocArray = [];
    cleanArray.forEach((doctorArray) => {
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
