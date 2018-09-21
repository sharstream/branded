// file to test server responde, database and backend
$(document).ready(function() {
  // Getting a reference to the input field where user adds a new movie
  var $newItemInput = $("input.new-item");
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
    var currentMovie = $(this).data("movie");
    $(this).children().hide();
    $(this).children("input.edit").val(currentMovie.title);
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
        `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">`,
          `<div class="card-header">${movie.title}</div>`,
          `<div class="card-body">`,
          `<h5 class="card-title">${movie.video}</h5>`,
          `<h5 class="card-title">${movie.duration}</h5>`,
          `<h5 class="card-title">${movie.release}</h5>`,
          `<h5 class="card-title">${movie.rating}</h5>`,
            `<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>`,
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
      title: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/movies", movie, getMovies);
    $newItemInput.val("");
  }
});