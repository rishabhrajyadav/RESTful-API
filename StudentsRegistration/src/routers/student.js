const express = require("express");
//1. create a new router
const router = new express.Router();
const Student = require("../db/students")
//1. create a new router
//2. we need to define the router
//3. we need to register our router


router.post("/students" , async(req,res) => {
    try {
        const user = new Student(req.body)
        const result = await user.save()
        res.status(201).send(result)  
      } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/students" , async(req,res) => {
    try {
        const studentsData = await Student.find()
        res.send(studentsData);
    } catch (error) {
        res.send(error)
    }
})

router.get("/students/:id" , async(req,res) => {
    try {
        const _id = req.params.id;
        //console.log(req.params);
        const studentsData = await Student.findById({_id})
        if(studentsData){
            res.send(studentsData);
        }else{
            res.status(404).send()
        }
        
    } catch (error) {
        res.send(error)
    }
})

router.patch("/students/:id", async(req,res) => {
    try {
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id , req.body ,{
            new : true
        })
        res.send(updateStudent)
    } catch (error) {
        res.send(error)
    }
})

router.delete("/students/:id",async(req,res) => {
    try {
        const _id = req.params.id;
        const deleteData = await Student.findByIdAndDelete({_id })
        if(deleteData){
            res.send(deleteData);
        }else{
            res.status(404).send()
        }
    } catch (error) {
        res.status(500).send()
    }
})


//2. we need to define the router
router.get("/rry" , (req,res) =>{
    res.send("This is a New Router")
})

module.exports = router;