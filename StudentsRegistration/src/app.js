const express = require("express");
require("./db/connection");
//const Student = require("./db/students")
const studentRouter = require("./routers/student")

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(studentRouter)

app.listen(PORT , () => {
    console.log(`Server is running on PORT : ${PORT}`)
})