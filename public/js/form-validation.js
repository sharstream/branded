// Wait for the DOM to be ready
$(function () {
  //Initialize from validation on the movie form
  // It has the name attribute "registration"

  $("form[name='registration']").validate({
    // specify validation rules
    rules: {
      // name of attributes from form
      title: "required",
      format: "required",
      duration: "required",
      release: {
        required: true,
        minlength: 4
      },
      rating: {
        required: true,
        minlength: 1
      }
    },
    messages: {
      title: "Please enter your title",
      format: "Please enter the format",
      duration: "Please provide the duration in minutes",
      release: {
        required: "Please enter the date movie was relased",
        minlength: "Please the release date must be between 1800 thru 2100"
      },
      rating: {
        required: "Please provide a rating",
        minlength: "Your rating must be at least 1 thru 5 long"
      }
    }
    // make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    // submitHandler: function(form) {
    //   form.submit();
    // }
  });
});