const JobUtil = require("../utils/JobUtils");
const Job = require("../model/Job");
const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    const profile = Profile.get();
    const statusCount = {
      progress: 0,
      done: 0,
      total: Job.get().length,
    };
    let jobTotalHours = 0;
    const updatedJobs = Job.get().map((job) => {
      const remaining = JobUtil.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;

      jobTotalHours =
        status === "progress"
          ? jobTotalHours + Number(job["daily-hours"])
          : jobTotalHours;

      return {
        ...job,
        remaining,
        status,
        budget: JobUtil.calculateBudget(job, Profile.get()["value-hour"]),
      };
    });

    const freeHours = profile["hours-per-day"] - jobTotalHours;

    return res.render("index", {
      jobs: updatedJobs,
      profile,
      statusCount,
      freeHours,
    });
  },
};
