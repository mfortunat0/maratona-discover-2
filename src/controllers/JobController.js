const Job = require("../model/Job");
const JobUtil = require("../utils/JobUtils");
const Profile = require("../model/Profile");

module.exports = {
  save: (req, res) => {
    const lastId = Job.get()[Job.get().length - 1]?.id || 1;
    Job.get().push({
      id: lastId,
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(),
    });
    return res.redirect("/");
  },

  create: (req, res) => res.render("job"),

  show: (req, res) => {
    const jobId = req.params.id;
    const job = Job.get().find((value) => Number(value.id) === Number(jobId));
    if (!job) return res.send("Job not found!!");
    job.budget = JobUtil.calculateBudget(job, Profile.get()["value-hour"]);
    res.render("job-edit", { job });
  },

  update: (req, res) => {
    const jobId = req.params.id;
    const job = Job.get().find((value) => Number(value.id) === Number(jobId));
    if (!job) return res.send("Job not found!!");
    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-houst": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };
    Job.update(
      Job.get().map((job) => {
        if (Number(job.id) === Number(jobId)) job = updatedJob;
        return job;
      })
    );
    res.redirect("/job/" + jobId);
  },

  delete: (req, res) => {
    const jobId = req.params.id;

    Job.delete(jobId);

    return res.redirect("/");
  },
};
