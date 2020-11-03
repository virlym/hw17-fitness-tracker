const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post("/submit", ({ body }, res) => {
  db.Exercise.create(body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/create", (req, res) => {
  console.log(req.body);
  db.Exercise.create(req.body)
  .then(dbExercise => {
    console.log(dbExercise);
    res.redirect("/");
  })
  .catch(({ message }) => {
    console.log(message);
  });
});

router.get("/submit2", (req, res) => {
  db.Workout.findOneAndUpdate(
    {_id: mongoose.Types.ObjectId("5fa0449829032a0ee46f4a5b")}, 
    {$push: { exercises: {_id: mongoose.Types.ObjectId("5fa09b9c72d52718ecbadb1a")} } }, 
    { new: true })
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
  });

  router.get("/populatedworkout", (req, res) => {
    db.Workout.find({})
      .populate("exercises")
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
  


  module.exports = router;