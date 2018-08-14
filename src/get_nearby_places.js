function getNearbyPlaces(remainingWalkTime=5) {
  let location = bestDestination[0].geometry.location
  let radius = Math.ceil( remainingWalkTime * 80 ).toString()
  let request = {
    location: location,
    radius: radius,
    type: ['restaurant'], // can only specify one type
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
    let imgWrapper = document.querySelector('.img-wrapper')
    // imgWrapper.style=""
    imgWrapper.setAttribute("style", "display:block")
    imgWrapper.innerHTML = ""
    for (let i = 0; i < results.length; i+=2) {
      let imgUrl1 = results[i].photos[0].getUrl({ maxWidth: 640 })
      let placeName1 = results[i].name
      let placeId1 = results[i].place_id
      let placeButton1 = document.createElement('button')
      placeButton1.classList.add('go-button', 'button', 'is-small', 'is-link')
      placeButton1.id = `${placeId1}`
      let detailContainer = document.createElement('div')
      detailContainer.classList.add('columns')

      if (results[i+1] !== undefined) {
        let detailBoxes = '<div class="column is-half">'
        let imgUrl2 = results[i+1].photos[0].getUrl({ maxWidth: 1080 })
        let placeName2 = results[i+1].name
        let placeId2 = results[i+1].place_id
        let placeButton2 = document.createElement('button')
        placeButton2.classList.add('go-button', 'button', 'is-small', 'is-link')
        placeButton2.id = `${placeId2}`
        detailBoxes += '<div class="box detail-box">'
          + `<h3 class="has-text-centered">${placeName1}</h3>`
          + `<img src=${imgUrl1} class="img-destination">`
          + `<div class="has-text-centered btn-wrapper"><button class="go-button button is-small is-link" href="#" id=${placeId1}>Meet There?</button></div></div></div>`
          + '<div class="column is-half">' ///is-half one
          + '<div class="box detail-box">'
          + `<h3 class="has-text-centered">${placeName2}</h3>`
          + `<img src=${imgUrl2} class="img-destination">` 
          + `<div class="has-text-centered btn-wrapper"><button class="go-button button is-small is-link" href="#" id=${placeId2}>Meet There?</button></div></div></div>`
        detailContainer.innerHTML = detailBoxes
        imgWrapper.append(detailContainer)
      } else {
        let detailBox = '<div class="column">'
        detailBox += '<div class="box detail-box">'
          + `<h3 class="has-text-centered">${placeName1}</h3>`
          + `<img src=${imgUrl1} class="img-destination">`
          + `<div class="has-text-centered btn-wrapper"><button class="go-button button is-small is-link" href="#" id=${placeId1}>Meet There?</button></div></div></div>`
        detailContainer.innerHTML = detailBox
        imgWrapper.append(detailContainer)
      }
    }
  } else {
    console.log('nearbySearch status: ', status)
  }

  document.querySelectorAll('.go-button').forEach((button) => {
    button.addEventListener('click', (e) => {
      let placeId = { "placeId": e.target.id }
      let form1 = document.querySelector('#form-address-1')
      let form2 = document.querySelector('#form-address-2')
      let input1 = document.querySelector('#input-address-1')
      let input2 = document.querySelector('#input-address-2')
      let orig1 = {lat: origin1.lat(), lng: origin1.lng()}
      let orig2 = {lat: origin2.lat(), lng: origin2.lng()}
      form1.reset()
      form2.reset()

      getDirections(orig1, orig2, placeId)
      setCenter(orig1, orig2, placeId)
    })
  })

}
