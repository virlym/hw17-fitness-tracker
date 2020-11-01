const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var exphbs = require("express-handlebars");

const PORT = process.env.PORT || 8080;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouttracker", { useNewUrlParser: true });

const activityRoutes = require('./controllers/workoutController');
app.use("/api/workout", activityRoutes);
const userRoutes = require('./controllers/exerciseController');
app.use("/api/exercise", userRoutes);
const htmlRoutes = require('./controllers/htmlController');
app.use(htmlRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
