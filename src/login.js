function loginAction() {

  //show login modal
  $(".login_trigger").click(function() {
    if (this.text === "Click here to Login" || this.text === "Already have an account? Log in."){
      $(".modal").addClass("is-active");
      $(".user_login").show();
      $("#warn-username-invalid").removeAttr("style").hide()
      $(".user_register").hide();
      $(".modal-card-title").text('Login');
      $(".login-button").text('Login');
      $("#register-form")[0].reset()
    } else {
      console.log
      alert(`hello ${$(".login_trigger")[0].attributes[4].value}`)
      //what to do when click Logged in as ___.
    }
  });

  //show register modal
  $(".register_trigger").click(function() {
        console.log(this);
    if (this.text === "or register" || this.text === "Don't have an account? Sign up!"){
      $(".modal").addClass("is-active");
      $(".user_login").hide();
      $(".user_register").show();
      $(".modal-card-title").text('Register');
      $(".login-button").text('Register');
      $("#login-form")[0].reset()
    } else {
      logout()
    }
  });

  // x out
  $("#login-close").click(function() {
     $(".modal").removeClass("is-active");
  });

  // click outside
  $(".modal-background").click(function() {
     $(".modal").removeClass("is-active");
  });

  // Logging in logic!
  $(".login-button").click(function(e) {
    if (this.innerText === "Login"){
      let loginname = document.querySelector('#login-username').value
      fetch('http://localhost:3000/api/v1/users').then(resp => resp.json()).then(json => json.data.find(user=>{return user.attributes.username === loginname})).then(result=>{
        if (result){
          login(result)
        }else{
          //login failed alert
          $("#warn-username-invalid").show()
          console.log('login failed!');

        }
      })

    } else if (this.innerText === "Register"){
      console.log(this.parentNode.parentNode.querySelector('#register-fullname').value)
      console.log(this.parentNode.parentNode.querySelector('#register-username').value)

      let fullname = document.querySelector('#register-fullname').value
      let username = document.querySelector('#register-username').value

      fetch('http://localhost:3000/api/v1/users',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: fullname, username: username})
      }).then(resp => resp.json()).then(json => {
        if (json.data.id){
          login(json.data)
        } else {
          //register failed alert
          if(json.data.attributes.name === ""){
            console.log('register failed: must have name');
          } else if (json.data.attributes.username === ""){
            console.log('register failed: must have username');
          } else {
            console.log('register failed: username probably taken');
          }
        }
      })
    }
  });


  function login(userinfo){
    console.log(userinfo)
    userid = userinfo.id
    username = userinfo.attributes.username
    fullname = userinfo.attributes.name
    $("#login-form")[0].reset()
    $("#register-form")[0].reset()
    $(".modal").removeClass("is-active");
    $(".login_trigger").text(`Logged in as ${username} (${fullname}) `)
    $(".register_trigger").text("Log out?")
    $(".login_trigger").attr("user-id", `${userid}`)
    $(".login_trigger").attr("user-fullname", `${fullname}`)
  }

  function logout(){
    $("#log-top-trg").text("Click here to Login")
    $("#reg-top-trg").text("or register")
    $("#reg-mod-trg").text("Don't have an account? Sign up!")
    $("#log-mod-trg").text("Already have an account? Log in.")
    $(".login_trigger").removeAttr("user-id")
    $(".login_trigger").removeAttr("user-fullname")
  }

}
