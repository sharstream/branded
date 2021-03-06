// file to test server responde, database and backend
$(document).ready(function() {

  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAUQYckh_cEHjx8jUoU-ERcqz8IEJ8NKhI",
    authDomain: "myfirstproject-b9662.firebaseapp.com",
    projectId: "myfirstproject-b9662"
  };

  firebase.initializeApp(config);

  // Getting a reference to the input field where user adds a new movie
  var $newTitleInput = $("input.title");
  var $newVideoInput = $("select.video");
  var $newDurationInput = $("input.duration");
  var $newReleaseInput = $("input.release");
  var $newRatingInput = $("input.rating");
  // Our new movies will go inside the movieContainer
  var $movieContainer = $(".movie-container");
  // Adding event listeners for deleting, editing, and adding movies
  $(document).on("click", "button.delete", deleteMovie);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".movie-item", editMovie);
  $(document).on("keyup", ".movie-item", finishEdit);
  $(document).on("blur", ".movie-item", cancelEdit);
  $(document).on("submit", "#movie-form", insertMovie);

  // Our initial movies array
  var movies = [];
  // User auth objects
  var userInfo;
  var userLoginID;
  // Getting movies from database when page loads
  getMovies();

  // This function resets the movies displayed with new movies from the database
  function initializeRows() {
    $movieContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < movies.length; i++) {
      rowsToAdd.push(createNewRow(movies[i]));
    }
    $movieContainer.prepend(rowsToAdd);
  }

  // This function grabs movies from the database and updates the view
  function getMovies() {
    $.get("/api/movies", function(data) {
      movies = data;
      initializeRows();
    });
  }

  // This function deletes a movie when the user clicks the delete button
  function deleteMovie(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/movies/" + id
    }).then(getMovies);
  }

  // This function handles showing the input box for a user to edit a movie
  function editMovie() {
    var currentMovie = $(this).data("movie");
    // $(this).children().hide();
    $(".card-header h3").html(`${currentMovie.title}`);
    console.log(`my current movie is: ${JSON.stringify(currentMovie)}`);
    $(this).children("input.edit").val(currentMovie.title);
    $(this).children("input.edit").val(currentMovie.video);
    $(this).children("input.edit").val(currentMovie.duration);
    $(this).children("input.edit").val(currentMovie.release);
    $(this).children("input.edit").val(currentMovie.rating);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  //new modal edit helper
  // $('#editModal').on('show.bs.modal', function (e) {
  //   // var currentMovie = $(e.relatedTarget).data('movie');
  // });

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var movie = $(this).parent().data("movie");
    movie.complete = !movie.complete;
    updateMovie(movie);
  }

  // This function starts updating a movie in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedMovie = $(this).data("movie");
    if (event.which === 13) {
      updatedMovie.title = $(this).children("input").val().trim();
      $(this).blur();
      updateMovie(updatedMovie);
    }
  }

  // This function updates a movie in our database
  function updateMovie(movie) {
    $.ajax({
      method: "PUT",
      url: "/api/movies",
      data: movie
    }).then(getMovies);
  }

  // This function is called whenever a movie item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentMovie = $(this).data("movie");
    if (currentMovie) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentMovie.title);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a movie-item row
  function createNewRow(movie) {
    var $newInputRow = $(
      [
        `<div class="card movie-item bg-light mb-3" style="max-width: 18rem; display: inline-block; margin: 15px">`,
          `<div class="card-header">`,
            `<h5 class="title">${movie.title}</h5>`,
          `</div>`,
          `<div class="card-body">`,
            `<h5 class="card-title">Format: ${movie.video}</h5>`,
            `<h5 class="card-title">Length: ${movie.duration}</h5>`,
            `<h5 class="card-title">Release: ${movie.release}</h5>`,
            `<h5 class="card-title">Rating: ${movie.rating}</h5>`,
          `</div>`,
          `<div class="card-footer bg-transparent border-dark">`,
            `<button class='delete'>x</button>`,
            `<button href="#editModal" class="movie-box" data-toggle="modal">✓</button>`,
            `<small class="text-muted">Last updated 3 mins ago</small>`,
          `</div>`,
        `</div>`
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", movie.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("movie", movie);
    if (movie.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new movie into our database and then updates the view
  function insertMovie(event) {
    event.preventDefault();
    var movie = {
      title: $newTitleInput.val().trim(),
      video: $newVideoInput.val().trim(),
      duration: $newDurationInput.val().trim(),
      release: $newReleaseInput.val(),
      rating: $newRatingInput.val().trim(),
      complete: false
    };

    $.post("/api/movies", movie, getMovies);
    $newTitleInput.val("");
    $newVideoInput.val("");
    $newDurationInput.val("");
    $newReleaseInput.val("");
    $newRatingInput.val("");
  }

  $('.display_login_modal').on("click", function() {
    $('.wrongLogin').hide();
    $('.wrongPassword').hide();
    $('.username_input').attr({'placeholder':'Existing User '});
    $('.password_input').attr({'placeholder':'Password '});
    $('.confirm_password_input').css({'display':'none'});
    $('.type_of_user_button').html('New User');
    $('.login_modal').eq(0).css({'opacity':'1','z-index':'2'});
    $('.login_modal').show();
  });

  $('.close_modal').click(function() {
    $('.wrongLogin').hide();
    $('.wrongPassword').hide();
    $('.login_modal').css({'opacity':0,'z-index':'-1'});
  });

  $('.type_of_user_button').on("click", function() {
    $('.wrongLogin').hide();
    $('.wrongPassword').hide();
    if ($(this).html() === "New User") {
      $('.username_input').attr({'placeholder':'New User'});
      $('.password_input').attr({'placeholder':'New Password'});
      $('.confirm_password_input').css({'display':'block'});
      $('.createUser').show();
      $('.login_button').hide();
      $(this).html('Existing User');
    } else if ($(this).html() === "Existing User") {
      $('.username_input').attr({'placeholder':'Existing User '});
      $('.password_input').attr({'placeholder':'Password '});
      $('.confirm_password_input').css({'display':'none'});
      $('.login_button').show();
      $('.createUser').hide();
      $(this).html('New User');
    }
  });

  $('.login_button').on("click", function(event){
    event.preventDefault();
    var username = $('.username_input').val().trim();
    var password = $('.password_input').val().trim();
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then( () => {
        $('.login_modal').hide();
        $('#logoutBtn').show();
        $('.display_login_modal').hide();
        $(".username_label").text('Username:');
        $('.username_label').append(`<div class"usr_email">${username}</div>`).css('color', 'white');
      }).catch( error => {
        // Handle Errors here.
        console.log(`error message: ${error}`);
        $(".wrongLogin").show();
        // ...
    });
  });

  $('.createUser').on("click", function(event){
    event.preventDefault();
    var username = $('.username_input').val().trim();
    var password = $('.password_input').val().trim();
    var confirm = $('.confirm_password_input').val().trim();
    if (/\S+@\S+\.\S+/.test(username) === true && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password) === true && password === confirm) {
      firebase.auth().createUserWithEmailAndPassword(username, password)
        .then( () => {
          $('.login_modal').hide();
          $('#logoutBtn').show();
          $('.display_login_modal').hide();
          $('.login_modal').hide();
          $(".username_label").text('Username:');
          $('.username_label').append(`<div class"usr_email">${username}</div>`).css('color', 'white');
        })
        .catch( error => {
          // Handle Errors here.
          console.log(`error message: ${error}`);
          $(".wrongLogin").show();
        });
    } else {
      //$('#login_modal').modal('show');
      if (password !== confirm) {
        $('.wrongLogin').hide();
        $('.wrongPassword').show();
      } else {
        $('.wrongLogin').show();
      }
      $('.username_input').val("");
      $('.password_input').val("");
      $('.confirm_password_input').val("");
    }
  });

  $('.display_logout').on("click", function(event){
    event.preventDefault();
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      console.log('Sign-out successful.');
    }).catch(function (error) {
      // An error happened.
      console.log(`An error happened: ${error}`);
    });
  });

  //Return user id and information as per objects
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      $('.display_logout').show();
      // $('.display_login_modal').hide();
      // $(".wrongLogin").css('display', 'none');
      // return user login object from JSON
      userInfo = firebaseUser;
      userLoginID = userInfo.uid;
    } else {
      // hide logout button by default
      $('.display_logout').hide();
      $('.display_login_modal').show();
      $('.username_input').val("");
      $('.username_label').empty();
      $('.usr_email').empty();
      $('.password_input').val("");
      $('.confirm_password_input').val("");
    }
  });

  changeStarRating = (event) => {
    let element = document.getElementById(event.target.id);

    let starId = parseInt(element.id);
    let strId = "";
    let i = 1;
    while (i <= starId) {
      strId = i.toString();
      let gold = dpcument.getElementById(strId);
      gold.style.color = "gold";
      i++;
    }
    while (i <= 5) {
      strId = i.toString();
      let white = documemnt.getElementById(strId);
      white.style.color = "white";
      i++;
    }

    this.countYellowStarts();
  };

  countYellowStarts = () => {
    let arr = [];
    let stars = document.getElementsByClassName("star");
    for (let index = 0; index < stars.length; index++) {
      if (stars[index].style.color === "gold") {

        const element = array[index].style.color;
        arr.push(element);

      }
    }
    this.setState({
      rating: arr.length
    })
  }

});