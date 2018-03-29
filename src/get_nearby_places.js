function getNearbyPlaces(remainingWalkTime=5) {
  let location = bestDestination[0].geometry.location
  let radius = Math.ceil( remainingWalkTime * 80 ).toString()
  let request = {
    location: location,
    radius: radius,
    // type: ['restaurant'], // can only specify one type
    openNow: false,
    maxPriceLevel: 5
  } 
  placesService.nearbySearch(request, handlePlacesResults)
}

function handlePlacesResults(results, status) {
  console.dir('places results: ', results)
  let nearbyMarkers = []
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      nearbyMarkers.push( setMarker(result) )
    })
    fitBoundsToMarkers(nearbyMarkers)

    //// -- build detail tiles -- ////
    let imgColumn = document.querySelector('#img-column')
    imgColumn.style=""
    for (let i = 0; i < results.length; i+=2) {
      let imgUrl1 = results[i].photos[0].getUrl({ maxWidth: 640 })
      let detailContainer = document.createElement('div')
      detailContainer.classList.add('columns')
      
      if (results[i+1] !== undefined) {
        let detailBoxes = '<div class="column is-half">'
        let imgUrl2 = results[i+1].photos[0].getUrl({ maxWidth: 640 })
        detailBoxes += '<div class="box">'
          + '<h3>One</h3>'
          + `<img src=${imgUrl1}></div></div>`
          + '<div class="column is-half">'
          + '<div class="box">'
          + '<p class="title">One</p>'
          + `<img src=${imgUrl2}></div></div>`
        detailContainer.innerHTML = detailBoxes
        imgColumn.append(detailContainer)
      } else {
        let detailBox = '<div class="column">'
        detailBox += '<div class="box">'
          + '<p class="title">One</p>'
          + `<img src=${imgUrl1}></div></div>`
        detailContainer.innerHTML = detailBox
        imgColumn.append(detailContainer)
      }
    }
    //// -- ////

  }
} // close handlePlaceResults
