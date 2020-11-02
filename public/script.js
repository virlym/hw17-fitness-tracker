$('#new-workout').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    window.location = "/newworkout";
  });

  $('#new-exercise').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    window.location = "/newexercise";
  });

  $('#view-workout').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    window.location = "/viewworkout";
  });

  $('#view-exercise').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    window.location = "/viewexercise";
  });

  $('.edit-workout').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    let workoutId = $(this).closest('.card').children('.card-header').data("workout-id");
    let workoutName = $(this).closest('.card').children('.card-header').text();
    console.log(workoutId);
    console.log(workoutName);
  });