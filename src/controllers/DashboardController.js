const Job = require('../model/Job')
const Profile = require('../model/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const profile = Profile.get()

        const statusCount = {
            done: 0,
            progress: 0,
            total: jobs.length
        }

        let jobsTotalHours = 0

        const updatedJobs = jobs.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            statusCount[status] += 1

            jobsTotalHours = status === 'progress' ? jobsTotalHours += Number(job["daily-hours"]) : jobsTotalHours

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        freeHours = Number(profile["hours-per-day"]) - jobsTotalHours

        return res.render("index", { profile: profile, jobs: updatedJobs, statusCount: statusCount, freeHours: freeHours })
    }
}