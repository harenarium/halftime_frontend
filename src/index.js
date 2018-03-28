$(document).ready(() => {
  // alert('hello')
  // fetch('http://localhost:3000/api/v1/users').then(resp =>resp.json).then(console.log)

    document.querySelector('#submit-addresses').addEventListener('click', (e) => {
      e.preventDefault()
      // clearLocations()
      let address1 = document.querySelector('#input-address-1').value
      let address2 = document.querySelector('#input-address-2').value
      let userName1 = document.querySelector('#user-name-1').value
      let userName2 = document.querySelector('#user-name-2').value

      clearMarkers()
      // geocode address 1
      geoCodeAddress(address1, userName1)
      .then((response) => {
        console.log('address 1 response: ', response)
        // set markers with optimistic rendering, then persist to db (persisting is a fetch POST?)
        setMarker(response, userName1)
        // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
      })
      .catch((status) => { console.error('address 1 error: ', status) })

      // geocode address 2
      geoCodeAddress(address2, userName2)
      .then((response) => {
        console.log('address 2 response: ', response)
        // set markers with optimistic rendering, then persist to db (persisting is a fetch POST?)
        setMarker(response, userName2)
        // TODO fetch request: POST to users -- userName1 & response.slice(0,1).place_id (place_id is a unique id for location)
      })
      .catch((status) => { console.error('address 2 error: ', status) })
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
        } else if (this.innerText === "Register"){
          console.log(this.parentNode.parentNode.querySelector('#register-fullname').value)
          console.log(this.parentNode.parentNode.querySelector('#register-username').value)
          //grab data and pass it
        }
        $("#login-form")[0].reset()
        $("#register-form")[0].reset()
        $(".modal").removeClass("is-active");
      });
    });

});
