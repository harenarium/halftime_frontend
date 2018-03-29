// google avg walking speed is approx 80 meters/minute
// an avg nyc long block between avenues is approx 280 meters



// var map; // from initMap
// var service; // placesService from initMap
// var infowindow;  from initMap

function getNearbyPlaces(remainingWalkTime=5) {
  let location = bestDestination[0].geometry.location
  let radius = Math.ceil( remainingWalkTime * 80 ).toString()
  let request = {
    location: location,
    radius: radius,
    type: ['restaurant'],
    openNow: false,
    maxPriceLevel: 3
  } 
  placesService.nearbySearch(request, handlePlacesResults)
}

function handlePlacesResults(results, status) {
  let nearbyMarkers = [] // working
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    results.forEach((result) => {
      nearbyMarkers.push( setMarker(result) )
    })
    fitBoundsToMarkers(nearbyMarkers)
  }
}



// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });

//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['restaurant']
//   };

//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

//////////

// function geoCodeAddress(address){
//   return new Promise( (resolve, reject) => {
//     geocoder.geocode( {"address": address}, (response, status) => {
//       if (status === google.maps.GeocoderStatus.OK) {
//         // resolve results to a then
//         resolve(response)
//       } else {
//         // reject the status on failed status
//         reject(status)
//       }
//     })
//   })
// }