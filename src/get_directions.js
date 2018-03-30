function getDirections(orig1, orig2, place) {
  if (lastRoute1 !== undefined) {
    lastRoute1.setMap(null)
    lastRoute2.setMap(null)
  }
  let directionsServiceLocal = new google.maps.DirectionsService;
  let directionsDisplay1 = new google.maps.DirectionsRenderer;
  let directionsDisplay2 = new google.maps.DirectionsRenderer;
  directionsDisplay1.setMap(map);
  directionsDisplay2.setMap(map);
  lastRoute1 = directionsDisplay1
  lastRoute2 = directionsDisplay2

  let eachRoute = function(orig, dest, desp) {
    directionsServiceLocal.route({
      origin: orig,
      destination: dest,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      desp.setDirections(response);
    });
  };
  eachRoute(orig1, place, directionsDisplay1)
  eachRoute(orig2, place, directionsDisplay2)
}