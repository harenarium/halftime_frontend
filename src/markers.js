function setMarker(response, userName) {
  let infoHtml = "<b>" + userName + "</b> <br/>" + response.formatted_address;
  let position = response.geometry.location
  let marker = new google.maps.Marker({
    map: map,
    position: position
  })
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(infoHtml)
    infoWindow.open(map, marker)
  })
  markersArray.push(marker)
  bounds.extend(position) // extend boundaries to encompass new marker's position
  map.fitBounds(bounds)
}

function clearMarkers() {
  markersArray.forEach((m) => { m.setMap(null) })
  markersArray = []
}