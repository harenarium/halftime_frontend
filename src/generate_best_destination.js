function generateBestDestination(response) {
  let originList = response.originAddresses;
  let destinationList = response.destinationAddresses; 
  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  for (var i = 0; i < originList.length; i++) {
    var results = response.rows[i].elements;
    for (var j = 0; j < results.length; j++) {
      outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
          ': ' + results[j].distance.text + ' in ' +
          results[j].duration.text + '<br>';
    }
  }

  geoCodeAddress(destinationList[0])
  .then(response => { // this response should have LatLng at response[0].geometry.location
    setMarker(response[0], 'destination')
    bestDestination = response
    // TODO fetch request: PATCH, add best destination
  }).then( response => {
    // **TODO** pass remainingWalkTime param to getNearbyPlaces
    getNearbyPlaces() // this should be called as part of the Promise.all (?), but it works for now TODO
  })

}
