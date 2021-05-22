module.exports = {
    remainingDays(job) {
        //cálculo de tempo restante
        const remainingDays = (Number(job["total-hours"]) / Number(job["daily-hours"])).toFixed()

        const createdDate = new Date(job.created_at)
        const dueDay = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()
        //transformar mili em dias
        const daysInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil(timeDiffInMs / daysInMs)

        //restam x dias
        return dayDiff
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}