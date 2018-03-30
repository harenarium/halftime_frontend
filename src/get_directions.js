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



      let outputDiv = document.getElementById('output');
      // outputDiv.innerHTML = ''; ///replace text from generate_best_destination.js
      let route = response.routes[0].legs[0]
      let steps = ""
      route.steps.forEach(step=>{
        steps += (`${step.instructions} (${step.duration.text}, ${step.distance.text}) <br>
        `)
      })
      let textDirections = (`Directions from ${route.start_address} to ${route.end_address} <br>
        Total Duration: ${route.duration.text} <br>
        Total Distance: ${route.distance.text} <br>
        Directions: ${steps} <br>`)
      console.log('response', response, textDirections)
      outputDiv.innerHTML += '<br>' + textDirections + '<br><br>'



      desp.setDirections(response);
    });
  };
  console.log('orig1', orig1)
  console.log('orig2', orig2)
  eachRoute(orig1, place, directionsDisplay1)
  eachRoute(orig2, place, directionsDisplay2)
}
