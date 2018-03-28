let percent1 = 0.3125
let percent2 = 1 - percent1

function generateOptimumDestination(response) {
  let originList = response.originAddresses;
  let destinationList = response.destinationAddresses; 
  let outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  console.log('destination address: ', destinationList[0])
  geoCodeAddress(destinationList[0])
  .then(response => { // this response should have LatLng at response[0].geometry.location
    setMarker(response[0])
    // TODO fetch request: PATCH, add optimum destination
  })

}


// for (var i = 0; i < originList.length; i++) {
//   var results = response.rows[i].elements;
//   for (var j = 0; j < results.length; j++) {
//     outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
//         ': ' + results[j].distance.text + ' in ' +
//         results[j].duration.text + '<br>';
//   }
// }