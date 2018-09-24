// file to test server responde, database and backend
$(document).ready(function() {
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
    debugger
    var currentMovie = $(this).data("movie");
    $(this).children().hide();
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
        `<div class="card movie-item border-success mb-3" style="max-width: 18rem; display: inline-block; margin: 15px">`,
          `<div class="card-header text-success">`,
            `<h5 class="title">${movie.title}</h5>`,
            `<input type='text' class='edit-title' style='display: none;'>`,
          `</div>`,
          `<div class="card-body text-success">`,
            `<h5 class="card-title">Format: ${movie.video}</h5>`,
            `<input type='text' class='edit-video' style='display: none;'>`,
            `<h5 class="card-title">Length: ${movie.duration}</h5>`,
            `<input type='text' class='edit-duration' style='display: none;'>`,
            `<h5 class="card-title">Release: ${movie.release}</h5>`,
            `<input type='text' class='edit-release' style='display: none;'>`,
            `<h5 class="card-title">Rating: ${movie.rating}</h5>`,
            `<input type='text' class='edit-rating' style='display: none;'>`,
          `</div>`,
          `<div class="card-footer bg-transparent border-success">`,
            `<button class='delete btn btn-danger'>x</button>`,
            `<button class='complete btn btn-success'>✓</button>`,
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

  $('.display_login_modal').click(function() {
    $('.username_input').attr({'placeholder':'Existing User '});
    $('.password_input').attr({'placeholder':'Password '});
    $('.confirm_password_input').css({'display':'none'});
    $('.type_of_user_button').html('New User');
    $('.login_modal').eq(0).css({'opacity':'1','z-index':'2'});
  });

  $('.close_modal').click(function() {
    $('.login_modal').css({'opacity':0,'z-index':'-1'});
  });

  $('.type_of_user_button').click(function() {
    if ($(this).html() === "New User") {
      $('.username_input').attr({'placeholder':'New User'});
      $('.password_input').attr({'placeholder':'New Password'});
      $('.confirm_password_input').css({'display':'block'});

      $(this).html('Existing User');
    } else if ($(this).html() === "Existing User") {
      $('.username_input').attr({'placeholder':'Existing User '});
      $('.password_input').attr({'placeholder':'Password '});
      $('.confirm_password_input').css({'display':'none'});

      $(this).html('New User');
    }
  });

  $('.login_button').click(function(){
    var username = $('.username_input').val();
    var password = $('.password_input').val();
    console.log('username: ' + username + '\n' + 'pass: ' + password);
    $.post("/login", username, password);
    $('.username_input').text("");
    $('.password_input').text("");
  });
});