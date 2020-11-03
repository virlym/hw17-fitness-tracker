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
    // let workoutName = $(this).closest('.card').children('.card-header').text();
    // exerciseArray = [];
    // $(this).closest('.card').children('.exercise-list').children('.exercise-listings').each(function(){
    //   exerciseArray.push({id: $(this).data("exercise-id"), name: $(this).data("exercise-name"), quantity: $(this).data("quantity"), measure: $(this).data("measure")});
    // });
    // let workoutObj;
    // if(exerciseArray.length > 0){
    //   workoutObj = {
    //     id: workoutId,
    //     name: workoutName,
    //     exercises: exerciseArray
    //   }
    //   console.log(workoutObj);
    // }
    // else{
    //   workoutObj = {
    //     id: workoutId,
    //     name: workoutName
    //   }
    //   console.log(workoutObj);
    // }
    window.location = ("/editworkout/" + workoutId);
    // $.ajax({
    //   method: "PUT",
    //   url: "/editworkout",
    //   data: workoutObj
    // })
    // .then(console.log("hi"));
  });

  $('.add-exercise').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    let workoutId = $(this).parents().parents().data("workout-id");
    let exerciseId = $(this).closest('.exercise-listings').data("exercise-id");
    const workoutObj = {
      wId : workoutId,
      eId: exerciseId
    }
    $.ajax({
      method: "PUT",
      url: "/api/workout/add",
      data: workoutObj
    })
    .then(
      function(){
        location.reload();
      }
    );
  });

  $('.remove-exercise').on('click', function(event) {
    event.preventDefault(); // To prevent following the link (optional)
    let workoutId = $(this).parents().parents().data("workout-id");
    let exerciseId = $(this).closest('.exercise-listings').data("exercise-id");
    const workoutObj = {
      wId : workoutId,
      eId: exerciseId
    }
    $.ajax({
      method: "PUT",
      url: "/api/workout/remove",
      data: workoutObj
    })
    .then(
      function(){
        location.reload();
      }
    );
  });