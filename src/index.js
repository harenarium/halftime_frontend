$(document).ready(() => {

  document.querySelector('#submit-addresses').addEventListener('click', (e) => {
    e.preventDefault()
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

  }) // end of submit event listener

  $(loginAction);

});
