let percent1 = 0.5
let percent2 = 1 - percent1

function calculateOptimumDestination(origin1, origin2){
  return new Promise( function(resolve, reject) {
    Promise.all([getAHalfpoint(origin1, origin2), getAHalfpoint(origin2, origin1)])
    .then((responses) => {
      let halfpoint1 = responses[0]
      let halfpoint2 = responses[1]
      // console.log({lat: precisionRound(halfpoint1.lat*percent1,6) + precisionRound(halfpoint2.lat*percent2,6), lng: precisionRound(halfpoint1.lng*percent1,6) + precisionRound(halfpoint2.lng*percent2,6)})
      resolve({lat: precisionRound(halfpoint1.lat*percent1,6) + precisionRound(halfpoint2.lat*percent2,6), lng: precisionRound(halfpoint1.lng*percent1,6) + precisionRound(halfpoint2.lng*percent2,6)})
    })
  })
}


let getAHalfpoint = function(origin1, origin2) {
  // console.log('inside change handeler');
  return new Promise( function(resolve, reject) {

    directionsService.route({
      origin: origin1,
      destination: origin2,
      travelMode: 'TRANSIT'
    }, function(response, status) {
        directionsDisplay.setDirections(response);
        // console.log(status)
        // console.log(response.routes[0].legs[0].duration)
        // console.log(response.routes[0].legs[0].steps)

        let steps = response.routes[0].legs[0].steps
        // let p = document.createElement('p')
        console.log(`Total duration:`, response.routes[0].legs[0].duration.text)
        // p.innerText= `Total duration: ${response.routes[0].legs[0].duration.text} = `
        // steps.forEach(step=>{
        //   p.innerText+= JSON.stringify(step.duration.text)
        //   p.innerText+= JSON.stringify(step.travel_mode)
        // })
        // console.log(p);
        // document.getElementById('output').append(p)

        let halftime = response.routes[0].legs[0].duration.value/2
        counter = -1
        while (halftime>0){
          counter ++
          halftime -= steps[counter].duration.value
        }
        let fractionOfStepToTravel = (steps[counter].duration.value + halftime)/steps[counter].duration.value
        let stepPathArrayLength = steps[counter].path.length
        // console.log(steps[counter])
        let pathPoint = steps[counter].path[Math.round(fractionOfStepToTravel*stepPathArrayLength)]
        let returnObj = {lat: pathPoint.lat(), lng:pathPoint.lng()}
        // console.log('this one', returnObj);
        resolve({lat: pathPoint.lat(), lng:pathPoint.lng()})
    });
  })
};
