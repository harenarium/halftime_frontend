function setMarker(response, userName) {
  // html for possible later use in popup infoWindow when clicking on marker
  let infoHtml = "<b>" + userName + "</b> <br/>" + response[0].formatted_address;
  let position = response[0].geometry.location
  let marker = new google.maps.Marker({
    map: map,
    position: position
  })

  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(infoHtml)
    infoWindow.open(map, marker)
  })

  markers.push(marker)

  bounds.extend(position) // extend boundaries to encompass new marker's position
  map.fitBounds(bounds)
  // console.log('bounds: ', bounds)
  // console.log('getBounds: ', map.getBounds())
}

function clearMarkers() {
  markers.forEach((m) => {
    m.setMap(null)
  })
  markers = []
}