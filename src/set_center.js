function setCenter(orig1, orig2, placeId) {
  placesService.getDetails(placeId, callback);
  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      let centerPoint = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
      fitBoundsToOrigins([orig1, orig2], originPoint)
    }
  }
}

