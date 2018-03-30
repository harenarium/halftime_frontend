function fitBoundsToOrigins(originArray, centerPoint) {
  // placesService.
  let bounds = new google.maps.LatLngBounds()
  originArray.forEach((origin) => {
      bounds.extend( origin )
  })
  setTimeout( () => {map.fitBounds(bounds)}, 1000 )
  map.panTo(centerPoint)
  map.setZoom(map.getZoom() + 2)
}
