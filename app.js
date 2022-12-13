const path = require("path");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", function (req, res) {
  res.render("index");
});
app.get("/restaurants", function (req, res) {
  const readfilepath = path.join(__dirname, "data", "data.json");
  const readfile = fs.readFileSync(readfilepath);
  const readfilejs = JSON.parse(readfile);
  res.render("restaurants",{numberOfSharedRestaurants:readfilejs.length , restaurants:readfilejs});
});
app.get("/about", function (req, res) {
  res.render("about");
});
app.get("/confirm", function (req, res) {
  res.render("confirm");
});
app.get("/recommend", function (req, res) {
  res.render("recommend");
});
app.post("/recommend", function (req, res) {
  const restaurantsName = req.body;
  const readfilepath = path.join(__dirname, "data", "data.json");
  const readfile = fs.readFileSync(readfilepath);
  const readfilejs = JSON.parse(readfile);
  readfilejs.push(restaurantsName);
  fs.writeFileSync(readfilepath, JSON.stringify(readfilejs));
  res.redirect("/confirm");
});
app.listen(3000);
