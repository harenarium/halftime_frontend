$(document).ready(() => {
  // alert('hello')
  fetch('http://localhost:3000/api/v1/users').then(resp =>resp.json).then(console.log)

  let getAllUsers = () => {
    return fetch("http://localhost:3000/api/v1/users")
      .then(res => res.json())
    }



  // getAllUsers()
  // .then(json => {
  //   console.log(json.filter((trainer) => {
  //     return trainer.pokemons.length >= 1
  //   }))
  // })
  //
  //
  //   // Here we do everything that handles our logic for our loading our trainers
  //   // and giving them an event listener for what should happen when they get clicked
  // getAllUsers()
  // .then(json => {
  //   let trainersContainer = document.getElementById('trainers-container')
  //   json.forEach(trainer => {
  //     let trainerDiv = document.createElement('div')
  //     trainerDiv.innerText = trainer.name
  //
  //     trainerDiv.addEventListener('click', function(event){
  //       let pokemonContainer = document.getElementById('pokemon-container')
  //       pokemonContainer.innerHTML = ""
  //
  //       trainer.pokemons.forEach(pokemon => {
  //         let pokemonLi = document.createElement('li')
  //
  //         pokemonLi.innerText = `${pokemon.name} (${pokemon.species})`
  //
  //         pokemonContainer.append(pokemonLi)
  //
  //         // Same as the line above, but concats the innerHTML of both
  //         // pokemonContainer.innerHTML += pokemonLi.innerHTML
  //       })
  //     })
  //
  //     trainersContainer.append(trainerDiv)
  //   })
  // })




  $(function() {
    $(".login_buttons").show();
    $(".logout_buttons").hide();
    $(".user_login").hide();
    $(".user_register").hide();

  		// Calling Login Form
  		$("#login_button").click(function() {
  				$(".login_buttons").hide();
          $(".logout_buttons").hide();
  				$(".logout_buttons").hide();
  				$(".user_login").show();
  		});

  		// Calling Register Form
  		$("#register_button").click(function() {
  				$(".login_buttons").hide();
          $(".logout_buttons").hide();
    			$(".logout_buttons").hide();
  				$(".user_register").show();
  		});

  		// Going back to Social Forms / logout
  		$(".logout").click(function() {
  				$(".user_login").hide();
  				$(".user_register").hide();
  				$(".login_buttons").show();
          $(".logout_buttons").hide();
  		});

      // Logging in!
      $("#login_form").on("submit", function() {
          $(".login_buttons").hide();
          $(".logout_buttons").show();
          $(".user_login").hide();
          $(".user_register").hide();
      });

      // Registering and also logging in!
      $("#register_form").on("submit", function() {
          $(".login_buttons").hide();
          $(".logout_buttons").show();
          $(".user_login").hide();
          $(".user_register").hide();
      });
  });



});
