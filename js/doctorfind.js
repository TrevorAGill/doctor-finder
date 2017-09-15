var apiKey = require('./../.env').apiKey;
export let doctorFind = {

  constructURL: function(zipcode, doctorName, issue) {
    if (zipcode) {
      var coordinates = this.convertZipcodeToCoordinates(zipcode);
      console.log("this is value of var coordinates: " + coordinates)
      return `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=${coordinates}%2C100&user_location=${coordinates}&skip=0&limit=30&user_key=${apiKey}`;
    };
  },

  retrieveDocInfo: function(coordinates, doctorName, issue) {
    debugger;
    return $.ajax({
      url: `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${issue}&location=${coordinates}%2C100&user_location=${coordinates}&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7`,
      data: {
        format: 'json'
      },
      type: 'GET',
      success: (response) => {
        console.log(response);
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

  getCoordinates: function(zipcode) {
    let that = this;
    return $.ajax({
      url: `https://www.zipcodeapi.com/rest/RGyJqQXCXtjSKnruBpzUnk10j1pmAWRrDqa3h7GeBZ7mnyRYXqTlKVm4WLqwIiYl/info.json/${zipcode}/degrees`,
      data: {
        format: 'json'
      },
      type: 'GET',
      success: (response, that) => {
        return response.lat + '%2C' + response.lng;
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

  executePromises(zipcode, doctorName, issue) {
    this.getCoordinates(zipcode).then(this.retrieveDocInfo(coordinates, doctorName, issue)).then((data) => {
      console.log(data);
    });
  }

}
// `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&location=${coordinates}%2C100&user_location=${coordinates}&skip=0&limit=30&user_key=${apiKey}`


//Example search by issue: https://api.betterdoctor.com/2016-03-01/doctors?query=acne&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7

//Example search by name: https://api.betterdoctor.com/2016-03-01/doctors?name=smith&query=&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7

//Example search by both (either one can be blank): https://api.betterdoctor.com/2016-03-01/doctors?name=smith&query=acne&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=30&user_key=35a35736a1380d9ce9216e9c11e5e8e7
