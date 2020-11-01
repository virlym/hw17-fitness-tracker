const express = require("express"); // npm install express
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
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

  router.get("/create", (req, res) => {
  db.Workout.create({ name: "Ernest Hemingway" })
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });
});

module.exports = router;