//maybe jquery a button on the tile "get directions" from that grab the place id.
//also get the two origins and then call get direction function

function getDirections(origin1, origin2, place){
  return new Promise( function(resolve, reject) {
    Promise.all([getOneDirectionNoNotTheBand(origin1, place), getOneDirectionNoNotTheBand(origin2, place)])
    .then((responses) => {
      let direction1 = responses[0]
      let direction2 = responses[1]
      // console.log({lat: precisionRound(halfpoint1.lat*percent1,6) + precisionRound(halfpoint2.lat*percent2,6), lng: precisionRound(halfpoint1.lng*percent1,6) + precisionRound(halfpoint2.lng*percent2,6)})
      resolve(responses)
    })
  })
}

let getOneDirectionNoNotTheBand = function(origin, place) {
  // console.log('inside change handeler');
  return new Promise( function(resolve, reject) {

    directionsService.route({
      origin: origin,
      destination: place,
      travelMode: 'TRANSIT'
    }, function(response, status) {
        directionsDisplay.setDirections(response);
        resolve(response)
    });
  })
};
