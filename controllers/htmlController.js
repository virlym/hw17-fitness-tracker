const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/newexercise", function (req, res) {
    res.render("createExercise");
});

router.get("/newworkout", function (req, res) {
    res.render("createWorkout");
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
            exerciseList.push({id: data._id, name: data.name, quantity: data.quantity, measure: data.measure});
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

router.get("/editworkout/:id", function (req, res) {
    console.log(req.params.id);
    db.Workout.find({_id: req.params.id})
    .populate("exercises")
    .then(dbWorkout => {
        //console.log(dbWorkout);
        let workoutList;
        let listIds = [];
        if(dbWorkout[0].exercises.length > 0){
            let exerciseList = [];
            dbWorkout[0].exercises.forEach(function (data2) {
                exerciseList.push({id: data2._id, name: data2.name, quantity: data2.quantity, measure: data2.measure});
                listIds.push(data2._id);
            });
            workoutList = {id: dbWorkout[0]._id, name: dbWorkout[0].name, exercises: exerciseList};
        }
        else{
            workoutList = {id: dbWorkout[0]._id, name: dbWorkout[0].name};
        }
        
        db.Exercise.find({_id: {$nin: listIds}})
        .then(dbExercise => {
            let exerciseList2 = [];
            dbExercise.forEach(function (data) {
                exerciseList2.push({id: data._id, name: data.name, quantity: data.quantity, measure: data.measure});
            });
        console.log(exerciseList2);
        
        const workoutObj = {
            workouts: workoutList,
            newExercises: exerciseList2
        }
        console.log("workout id for reference", workoutObj.workouts.id);
        res.render("editWorkouts", workoutObj);
        })
        .catch(err => {
            res.json(err);
        });
    })
    .catch(err => {
      res.json(err);
    });    
});

module.exports = router;