const express = require("express")
const MenRanking = require("../models/men")
const router = express.Router();

router.post("/men" , async(req,res) => {
    try {
        const Men = new MenRanking(req.body)
        const result = await Men.save();
        res.send(result)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/men" , async(req,res) => {
    try {
        const result = await MenRanking.find()
        res.send(result)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/men/:id" , async(req,res) => {
    try {
        const _id = req.params.id
        const result = await MenRanking.findById(_id).sort({"ranking" : 1})
        res.send(result)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch("/men/:id" , async(req,res) => {
    try {
        const _id = req.params.id
        const result = await MenRanking.findByIdAndUpdate(_id , req.body ,{
            new : true
        })
        res.send(result)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/men/:id" , async(req,res) => {
    try {
        const _id = req.params.id
        const result = await MenRanking.findByIdAndDelete(_id)
        res.send(result)
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = router;
