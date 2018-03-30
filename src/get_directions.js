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

  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; ///replace text from generate_best_destination.js
  let eachRoute = function(orig, dest, desp) {
    directionsServiceLocal.route({
      origin: orig,
      destination: dest,
      travelMode: 'TRANSIT'
    }, function(response, status) {

      let steps = document.createElement('ol')
      let route = response.routes[0].legs[0]
      // let steps = ""
      route.steps.forEach(step=>{
        let li = document.createElement('li')
        li.style = "text-align: left;"
        li.innerText= (`${step.instructions} (${step.distance.text}, ${step.duration.text})`)
        steps.append(li)
      })

      let textDirections = (`Directions from <strong>${route.start_address}</strong> to <strong>${route.end_address}</strong> (Total Distance: ${route.distance.text}, Total Duration: ${route.duration.text})<br>`)
      outputDiv.innerHTML += textDirections
      outputDiv.append(steps)
      outputDiv.innerHTML += `<br>`

      // let textDirections = (`Directions from <strong>${route.start_address}</strong> to <strong>${route.end_address}</strong> (Total Distance: ${route.distance.text}, Total Duration: ${route.duration.text}) <br> ${steps}`)
      // console.log('response', response, textDirections)
      // outputDiv.innerHTML += textDirections + '<br>'


      desp.setDirections(response);
    });
  };
  eachRoute(orig1, place, directionsDisplay1)
  eachRoute(orig2, place, directionsDisplay2)
}
