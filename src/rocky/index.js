var rocky = require('rocky');

var location;

rocky.on('minutechange', function(event) {
  // Send a message to fetch location information (on startup and every minute)
  rocky.postMessage({'fetch': true});
  
  // Tick every minute
  rocky.requestDraw();
});

rocky.on('message', function(event) {
  // Receive a message from the mobile device (pkjs)
  var message = event.data;

  if (message.location) {
    // Save the location data
    location = message.location;

    // Request a redraw so we see the information
    rocky.requestDraw();
  }
});

rocky.on('draw', function(event) {
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Draw the location text
  drawLocation(ctx, location);
});  

function drawLocation(ctx, location) {
  var latitudeString = location.coords.latitude
  var longitudeString = location.coords.longitude;
  
  // Draw the text, top center
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '14px Gothic';
  ctx.fillText(latitudeString, ctx.canvas.unobstructedWidth / 2, 2);
  ctx.fillText(longitudeString, ctx.canvas.unobstructedWidth / 2, 12);
}

