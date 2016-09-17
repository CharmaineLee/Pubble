// PebbleKit JS (pkjs)

var myAPIKey = '90315628e806c356a01030a77c3077f6';

Pebble.on('message', function(event) {
  // Get the message that was passed
  var message = event.data;

  if (message.fetch) {
    navigator.geolocation.getCurrentPosition(function(location) {
      var url = 'https://developers.zomato.com/api/v2.1/geocode' +
              '?lat=' + pos.coords.latitude +
              '&lon=' + pos.coords.longitude +
              '&user-key=' + myAPIKey;

      request(url, 'GET', function(respText) {
        var restaurantData = JSON.parse(respText);

        Pebble.postMessage({
          'restaurantData': restaurantData
        });
      });
    }, function(err) {
      console.error('Error getting location');
    },
    { timeout: 15000, maximumAge: 60000 });
  }
});
