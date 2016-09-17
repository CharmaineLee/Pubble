// Rocky JS (rocky.js)

var rocky = require('rocky');

var restaurantData;

rocky.on('minutechange', function(event) {
  // Send a message to fetch location information (on startup and every minute)
  rocky.postMessage({'fetch': true});
  
  // Tick every minute
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.restaurantData) {
    // Save the location data
    restaurantData = message.restaurantData;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Draw the location text
  drawLocation(ctx, restaurantData);
});  

function drawLocation(ctx, location) {
  var cityName = location.locality.city_name;

  // Draw the text, top center
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '14px Gothic';
  ctx.fillText(cityName, ctx.canvas.unobstructedWidth / 2, 2);
}

