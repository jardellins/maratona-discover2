let data = [
    {
        id: 1,
        name: "Pizzaria Gulozo",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now()
    },
    {
        id: 2,
        name: "OneTwo Projact",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now()
    }
]

module.exports = {
    get() {
        let newId = 1

        data.map(data => {
            data.id = newId

            newId++
        })
        
        return data
    },
    update(newJob) {
        data = newJob
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    },
    create(newJob) {
        data.push(newJob)
    }
}