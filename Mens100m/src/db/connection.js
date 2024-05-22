const mongoose = require("mongoose")
const URI = "mongodb://127.0.0.1:27017/olympics";

mongoose.connect(URI)
.then(() => {
    console.log("Database Connected Successfully")
}).catch((err) => {
    console.log(`${err} : Database Connection Failed...`)
})