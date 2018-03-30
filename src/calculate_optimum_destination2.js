//replace in index.html

function calculateOptimumDestination(origin1, origin2){
  return new Promise( function(resolve, reject) {
    Promise.all([getDirectionInfo(origin1, origin2), getDirectionInfo(origin2, origin1)])
    .then((responses) => {
      let response1 = responses[0]
      let response2 = responses[1]
      console.log(`Total duration origin to origin:`, response1.routes[0].legs[0].duration.text, response2.routes[0].legs[0].duration.text)
      let shorterTotalTime = Math.min(response1.routes[0].legs[0].duration.value, response2.routes[0].legs[0].duration.value)
      let longerTotalTime = Math.max(response1.routes[0].legs[0].duration.value, response2.routes[0].legs[0].duration.value)

      let steps1 = response1.routes[0].legs[0].steps
      let steps2 = response2.routes[0].legs[0].steps
      let halfPoint1 = getHalfpoint(steps1, shorterTotalTime)
      let halfPoint2 = getHalfpoint(steps2, shorterTotalTime)

      resolve({lat: (halfPoint1.lat()+halfPoint2.lat())*0.5, lng: (halfPoint1.lng()+halfPoint2.lng())*0.5})


    })
  })
}

let getHalfpoint = function(steps, travelTime){
  let halftime = travelTime/2
  let counter = -1

  while (halftime>0){
    counter ++
    halftime -= steps[counter].duration.value
  }
  let fractionOfStepToTravel = (steps[counter].duration.value + halftime)/steps[counter].duration.value
  let stepPathArrayLength = steps[counter].path.length
  return steps[counter].path[Math.round(fractionOfStepToTravel*stepPathArrayLength)]
}


let getDirectionInfo = function(origin1, origin2) {
  // console.log('inside change handeler');
  return new Promise( function(resolve, reject) {

    directionsService.route({
      origin: origin1,
      destination: origin2,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      resolve(response)
    });
  })
};
