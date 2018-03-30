$(document).ready(() => {

  document.querySelector('#output').addEventListener('click', (e)=>{
    if ($('#input-address-1')[0].value && $('#input-address-2')[0].value && e.target.innerText.slice(2,22) === "Welcome to Halftime!"){
      submitAddresses(e)
    } else if (e.target.innerText.slice(2,22) === "Welcome to Halftime!") {
      console.log('warn: please enter two addresses');
    }
  }) // end of submit event listener
  document.querySelector('#input-address-2').addEventListener('keyup', (e)=>{
    const key = parseInt(e.detail || e.which || e.location)
    console.log(key);
    if (key === 13) {
      submitAddresses(e)
    }

  }) // end of submit event listener

  $(loginAction);

});

let submitAddresses = (e) => {
  let address1 = document.querySelector('#input-address-1').value
  let address2 = document.querySelector('#input-address-2').value
  let userName1 = document.querySelector('#user-name-1').value
  let userName2 = document.querySelector('#user-name-2').value
  // let origin1, origin2
  let destinationA
  let distanceMatrixOptions
  let bestDestination

  clearMarkers()

  Promise.all([geoCodeAddress(address1, userName1), geoCodeAddress(address2, userName2)])
    .then((responses) => {
      let response1 = responses[0][0]
      let response2 = responses[1][0]
      origin1 = response1.geometry.location
      console.log('address 1 response: ', response1)
      setMarker(response1, 'origin', userName1)
      // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
      origin2 = response2.geometry.location
      console.log('address 2 response: ', response2)
      setMarker(response2, 'origin', userName2)
      // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)

      // both geocode promises resolved so origin1 & origin2 should be defined
      calculateOptimumDestination(origin1, origin2).then(destinationA => {
        distanceMatrixOptions = {
          origins: [origin1, origin2],
          destinations: [destinationA],
          travelMode: 'TRANSIT',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }

        // anti-pattern (nested promise): how to fix: http://www.datchley.name/promise-patterns-anti-patterns/
        retrieveDistanceMatrix(distanceMatrixOptions)
        .then((response) => {
          generateBestDestination(response)
        })
        .catch((status) => { console.error('getDistanceMatrix error: ', status) })
      })
    })
    .catch((status) => { console.error('Promise.all error: ', status) })

}
