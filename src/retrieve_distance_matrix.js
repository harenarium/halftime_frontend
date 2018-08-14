function retrieveDistanceMatrix(optionsObject) {
  return new Promise( (resolve, reject) => {
    distanceMatrixService.getDistanceMatrix(optionsObject, (response, status) => {
      if (status === 'OK') { // TODO - test with: status === google.maps.GeocoderStatus.OK
        resolve(response)
      }else {
        reject(status)
      }
    })
  })
}
