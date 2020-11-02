const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/newexercise", function (req, res) {
    res.render("createExercise");
});

router.get("/newworkout", function (req, res) {
    res.render("createworkout");
});

router.get("/viewworkout", function (req, res) {
    db.Workout.find({})
    .populate("exercises")
    .then(dbWorkout => {
        //console.log(dbWorkout);
        let workoutList = [];
        dbWorkout.forEach(function (data) {
            if(data.exercises.length > 0){
                console.log("test was not empty");
                let exerciseList = [];
                data.exercises.forEach(function (data2) {
                    exerciseList.push({id: data2._id, name: data2.name, quantity: data2.quantity, measure: data2.measure});
                });
                workoutList.push({id: data._id, name: data.name, exercises: exerciseList});
            }
            else{
                workoutList.push({id: data._id, name: data.name});
            }
        });
        const workoutObj = {
            workouts: workoutList
        }
        res.render("storedWorkouts", workoutObj);
    })
    .catch(err => {
      res.json(err);
    });    
});

router.get("/viewexercise", function (req, res) {
    db.Exercise.find({})
    .then(dbExercise => {
        let exerciseList = [];
        dbExercise.forEach(function (data) {
            exerciseList.push(data.dataValues);
        });
        const exerciseObj = {
            exercises: exerciseList
        }
        res.render("storedExercises", exerciseObj);
    })
    .catch(err => {
        res.json(err);
    });
});

module.exports = router;