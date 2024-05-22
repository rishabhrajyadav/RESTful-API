const express = require("express");
require("./db/connection")
const menRouter = require("./routers/men")
//const MenRanking = require("./models/men")
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(menRouter);

app.listen(PORT , () => {
    console.log(`Server is running at : ${PORT}`);
})