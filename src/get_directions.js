function getDirections(orig1, orig2, place) {
  let directionsServiceLocal = new google.maps.DirectionsService;
  let directionsDisplay1 = new google.maps.DirectionsRenderer;
  let directionsDisplay2 = new google.maps.DirectionsRenderer;
  directionsDisplay1.setMap(map);
  directionsDisplay2.setMap(map);

  let eachRoute = function(orig, dest, desp) {
    directionsServiceLocal.route({
      origin: orig,
      destination: dest,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      // debugger
      desp.setDirections(response);
    });
  };
  eachRoute(orig1, place, directionsDisplay1)
  eachRoute(orig2, place, directionsDisplay2)
}