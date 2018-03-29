function fitBoundsToMarkers(markers) {
  let bounds = new google.maps.LatLngBounds()
  markers.forEach((marker) => {
    if ( marker.getVisible() ) {
      bounds.extend( marker.getPosition() )
    }
  })
  map.fitBounds( bounds )
}