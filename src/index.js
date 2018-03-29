$(document).ready(() => {

  let originIcon = 'https://chart.googleapis.com/chart?' + 'chst=d_map_pin_letter&chld=O|FFFF00|000000';
  let destinationIcon = 'https://chart.googleapis.com/chart?' + 'chst=d_map_pin_letter&chld=D|FF0000|000000';

  document.querySelector('#submit-addresses').addEventListener('click', (e) => {
    e.preventDefault()
    let address1 = document.querySelector('#input-address-1').value
    let address2 = document.querySelector('#input-address-2').value
    let userName1 = document.querySelector('#user-name-1').value
    let userName2 = document.querySelector('#user-name-2').value
    let origin1, origin2
    let destinationA
    let distanceMatrixOptions

    clearMarkers()

    Promise.all([geoCodeAddress(address1, userName1), geoCodeAddress(address2, userName2)])
      .then((responses) => {
        let response1 = responses[0][0]
        let response2 = responses[1][0]
        origin1 = response1.geometry.location
        console.log('address 1 response: ', response1)
        setMarker(response1, userName1)
        // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
        origin2 = response2.geometry.location
        console.log('address 2 response: ', response2)
        setMarker(response2, userName2)
        // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)

        // both geocode promises resolved so origin1 & origin2 should be defined
        calculateOptimumDestination(origin1, origin2).then(destinationA => {
          distanceMatrixOptions = {
            origins: [origin1, origin2],
            destinations: [destinationA],
            travelMode: 'TRANSIT',
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: false,
            avoidTolls: false
          }

          // anti-pattern (nested promise): how to fix: http://www.datchley.name/promise-patterns-anti-patterns/
          retrieveDistanceMatrix(distanceMatrixOptions)
          .then((response) => {
            generateOptimumDestination(response) // working point
          })
          .catch((status) => { console.error('getDistanceMatrix error: ', status) })
        })
      })
      .catch((status) => { console.error('Promise.all error: ', status) })

  }) // end of submit event listener


    $(function() {
      $(".login_trigger").click(function() {
        $(".modal").addClass("is-active");
        $(".user_login").show();
        $(".user_register").hide();
        $(".modal-card-title").text('Login');
        $(".login-button").text('Login');
        $("#register-form")[0].reset()
      });

      $(".register_trigger").click(function() {
        $(".modal").addClass("is-active");
        $(".user_login").hide();
        $(".user_register").show();
        $(".modal-card-title").text('Register');
        $(".login-button").text('Register');
        $("#login-form")[0].reset()
      });

      $("#login-close").click(function() {
         $(".modal").removeClass("is-active");
      });

      $(".modal-background").click(function() {
         $(".modal").removeClass("is-active");
      });

      // Logging in!
      $(".login-button").click(function(e) {
        if (this.innerText === "Login"){
          console.log(this.parentNode.parentNode.querySelector('#login-username').value)
          //grab data and pass it
          // fetch('http://localhost:3000/api/v1/users').then(resp => resp.json()).then(json =>{
          //   json.//for Each for obj check if username === above value. if find then log in else fail
          // })

        } else if (this.innerText === "Register"){
          console.log(this.parentNode.parentNode.querySelector('#register-fullname').value)
          console.log(this.parentNode.parentNode.querySelector('#register-username').value)
          //grab data and pass it
          // validate username is unique? and full name is present

          // fetch('http://localhost:3000/api/v1/users',{
          //   method: POST,
          //   headers: , //what here
          //   body: JSON.stringify({}) //what here
          // }).then(resp => resp.json()).then(json =>{
          //   json.//log in as new user
          // })

        }
        $("#login-form")[0].reset()
        $("#register-form")[0].reset()
        $(".modal").removeClass("is-active");
      });

      //logging out
      if logged in
      log out
      $(."login_trigger").text("Click here to Login")
      $(."register_trigger").text("or register")


    });

});
