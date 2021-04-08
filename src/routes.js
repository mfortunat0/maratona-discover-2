const express = require("express");
const path = require("path");

const routes = express.Router();

const views = path.join(__dirname, "/views/");

const Profile = {
  name: "Matheus",
  avatar: "https://github.com/mfortunat0.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
};

routes.get("/", (req, res) => res.render(views + "index"));
routes.get("/job", (req, res) => res.render(views + "job"));
routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));
routes.get("/profile", (req, res) =>
  res.render(views + "profile", { Profile })
);

module.exports = routes;
