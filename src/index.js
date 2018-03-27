$(document).ready(() => {
  // alert('hello')
  // fetch('http://localhost:3000/api/v1/users').then(resp =>resp.json).then(console.log)

  document.querySelector('#submit-addresses').addEventListener('click', (e) => {
    e.preventDefault()
    // clearLocations()
    let address1 = document.querySelector('#input-address-1').value
    let address2 = document.querySelector('#input-address-2').value
    let userName1 = document.querySelector('#user-name-1').value
    let userName2 = document.querySelector('#user-name-2').value

    clearMarkers()
    // geocode address 1
    geoCodeAddress(address1, userName1)
    .then((response) => {
      console.log('address 1 response: ', response)
      // set markers with optimistic rendering, then persist to db (persisting is a fetch POST?)
      setMarker(response, userName1)
      // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
    })
    .catch((status) => { console.error('address 1 error: ', status) })

    // geocode address 2
    geoCodeAddress(address2, userName2)
    .then((response) => {
      console.log('address 2 response: ', response)
      // set markers with optimistic rendering, then persist to db (persisting is a fetch POST?)
      setMarker(response, userName2)
      // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
    })
    .catch((status) => { console.error('address 2 error: ', status) })
  }) // end of submit event listener


}); // last

