function retrieveDistanceMatrix(optionsObject) {
  return new Promise( (resolve, reject) => {
    distanceMatrixService.getDistanceMatrix(optionsObject, (response, status) => {
      if (status === 'OK') { // will this work or do we need something like: if (status === google.maps.GeocoderStatus.OK)
        resolve(response)
      }else {
        reject(status)
      }
    })
  })
}
