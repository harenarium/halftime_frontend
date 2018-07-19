function setMarker(response, markerType, userName) {
 
  let position = response.geometry.location
  let icon, infoHtml

  switch (markerType) {
    case 'origin':
      icon = 'img/blue_flag.png'
      infoHtml = "<b>" + userName + "</b> <br/>" + response.formatted_address
      break;
    case 'destination':
      icon = 'img/green_flag.png'
      infoHtml = "<b>" + "Half Time Point" + "</b> <br/>" + response.formatted_address
      break;
    default:
      infoHtml = "<b>" + response.name + "</b> <br/>" + response.vicinity
  }

  let marker = new google.maps.Marker({
    map: map,
    position: position,
    icon: icon
  })
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.setContent(infoHtml) 
    infoWindow.open(map, marker)
  })
  markersArray.push(marker)
  bounds.extend(position)
  map.fitBounds(bounds)
  return marker
}

function clearMarkers() {
  markersArray.forEach(m => { m.setMap(null) })
  markersArray = []
}


// let originIcon = 'https://chart.googleapis.com/chart?' + 'chst=d_map_pin_letter&chld=O|FFFF00|000000';
// let destinationIcon = 'https://chart.googleapis.com/chart?' + 'chst=d_map_pin_letter&chld=D|FF0000|000000';