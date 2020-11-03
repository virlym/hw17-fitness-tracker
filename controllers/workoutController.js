const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put("/remove", (req, res) => {
    const reId = req.body.wId;
    console.log("trying to remove", req.body.eId);
    db.Workout.updateOne({_id: req.body.wId}, {$pull: {exercises: {$in: req.body.eId}}})
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.status(200).end();
    })
    .catch(err => {
      res.json(err);
    });
  });

  router.put("/add", (req, res) => {
    const reId = req.body.wId;
    db.Workout.updateOne({_id: req.body.wId}, {$push: {exercises: {_id: req.body.eId}}})
    .then(dbWorkout => {
      console.log(dbWorkout);
      res.status(200).end();
    })
    .catch(err => {
      res.json(err);
    });
  });

  router.get("/populatedworkout", (req, res) => {
    db.Workout.find({})
      .populate("exercise")
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post("/create", (req, res) => {
  db.Workout.create(req.body)
  .then(dbWorkout => {
    console.log(dbWorkout);
    res.redirect("/");
  })
  .catch(({ message }) => {
    console.log(message);
  });
});

module.exports = router;