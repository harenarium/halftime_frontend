function geoCodeAddress(address){
  return new Promise( (resolve, reject) => {
    geocoder.geocode( {"address": address}, (response, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        // resolve results to a then
        resolve(response)
      } else {
        // reject the status on failed status
        reject(status)
      }
    })
  })
}