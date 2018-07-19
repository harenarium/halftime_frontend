function generateBestDestination(response) {
  let originList = response.originAddresses;
  let destinationList = response.destinationAddresses;
  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';
  outputDiv.innerText = '← Here are some places that are convenient to get to. Pick one to see directions!';

  for (var i = 0; i < originList.length; i++) {
    var results = response.rows[i].elements;
    for (var j = 0; j < results.length; j++) {
      let output = originList[i] + ' to ' + destinationList[j] +  ': ' + results[j].distance.text + ' in ' +  results[j].duration.text + '<br>';
      console.log(output);
    }
  }

  geoCodeAddress(destinationList[0])
  .then(response => {
    setMarker(response[0], 'destination')
    bestDestination = response
    // TODO fetch request: PATCH, add best destination
  }).then( response => {
    // TODO pass remainingWalkTime param to getNearbyPlaces
    getNearbyPlaces()
  })

}
