const Job = require('../model/Job')
const Profile = require('../model/Profile')
const jobUtils = require('../utils/JobUtils')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    index(req, res) {
        const job = Job.get()
        const profile = Profile.get()

        const updatedJobs = job.map((job) => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })

        return res.render("index", { profile: profile, jobs: updatedJobs })
    },

    create(req, res) {
        return res.render("job")
    },

    save(req, res) {
        const jobs = Job.get()
        // let lastId = Number(jobs[jobs.length - 1].id)
        const lastId = jobs[jobs.length - 1]?.id || 0

        // if (lastId <= 0) {
        //     lastId = 0
        // }

        jobs.push({
            id: lastId + 1,
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now()
        })

        return res.redirect('/')
    },

    show(req, res) {
        const jobId = req.params.id
        const jobs = Job.get()
        const profile = Profile.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job not found!")
        }

        job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

        return res.render("job-edit", { job })
    },

    update(req, res) {
        const jobId = req.params.id
        const jobs = Job.get()

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send("Job not found!")
        }

        const updateJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }

        const newJobs = Job.data.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updateJob
            }

            return job
        })

        Job.update(newJobs)

        res.redirect
    },

    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId)

        return res.redirect('/')
    }
}