let percent1 = 0.3125
let percent2 = 1 - percent1

function generateBestDestination(response) {
  let originList = response.originAddresses;
  let destinationList = response.destinationAddresses; 
  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  geoCodeAddress(destinationList[0])
  .then(response => { // this response should have LatLng at response[0].geometry.location
    setMarker(response[0], 'destination')
    bestDestination = response
    getNearbyPlaces() // this should be called as part of the Promise.all, but it works for now TODO
    // TODO fetch request: PATCH, add best destination
  })

}
