const express = require("express");
const path = require("path");

const routes = express.Router();

const views = path.join(__dirname, "/views/");

routes.get("/", (req, res) => res.render(views + "index"));
routes.get("/job", (req, res) => res.render(views + "job"));
routes.get("/job/edit", (req, res) => res.render(views + "job-edit"));
routes.get("/profile", (req, res) => res.render(views + "profile"));

module.exports = routes;
