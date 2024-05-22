const mongoose = require("mongoose")

//connection
const URI = "mongodb://127.0.0.1:27017/student-api" 

mongoose.connect(URI)
.then(() => console.log("database connection successfull...."))
.catch((err) => console.log("Database connection failed"));