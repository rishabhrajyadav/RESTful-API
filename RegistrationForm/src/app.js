require('dotenv').config()
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParsser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs")

require("./db/conn")
const Employee = require("./models/registers");
const auth = require("./middleware/auth")

const app = express()
const PORT = process.env.PORT || 8000;

const staticPath = path.join(__dirname , "../public")
const templatePath = path.join(__dirname , "../templates/views")
const partialsPath = path.join(__dirname , "../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParsser());

app.use(express.static(staticPath))
app.set("view engine" , "hbs");
app.set("views" , templatePath);
hbs.registerPartials(partialsPath)

app.get("/" , (req,res) => {
    res.render("index")
})
app.get("/secret" , auth , (req,res) => {
    console.log(`this is the JWt : ${req.cookies.jwt}`);
    res.render("secret")
})

app.get("/logout" , auth , async(req,res) =>{
    try {
        console.log(req.user);
        /* req.user.tokens = req.user.tokens.filter((currElem) => {
            return currElem.token !== req.token;
        }) */
        req.user.tokens = []
        res.clearCookie("jwt");
        await req.user.save();
        res.render("login");
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get("/register" , (req,res) => {
    res.render("register")
})
app.get("/login" , (req,res) => {
    res.render("login")
})

app.post("/register" , async(req,res) => {
    try {
       const password = req.body.password;
       const cpassword = req.body.confirmPassword;
       
       if(password === cpassword){
         const registerEmployee = new Employee({
            firstname : req.body.name ,
            lastname : req.body.lastname ,
            email  : req.body.email ,
            gender  : req.body.gender ,
            phone  : req.body.phoneNumber ,
            age  : req.body.age ,
            password  : password ,
            confirmpassword  : cpassword ,
         })
         
         //token generation
        const token = await registerEmployee.generateAuthToken()

        res.cookie("jwt" , token , {
            expires: new Date(Date.now() + 60000),
            httpOnly: true
        })
        console.log(cookie);

         const register = await registerEmployee.save();
         res.status(201).render("index");
       }else{
        res.send("Password are not matching")
       }
    } catch (error) {
        res.status(404).send(error)
    }
})

//login check
app.post("/login" , async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        
        const userEmail = await Employee.findOne({email : email})
        const isPassCorrect = await bcrypt.compare(password , userEmail.password);

        const token = await userEmail.generateAuthToken()
        console.log("the token part" + token);

        res.cookie("jwt" , token , {
            expires: new Date(Date.now() + 30000),
            httpOnly: true,
            //secure : true
        })

        if(isPassCorrect){
            res.status(201).render("index");
        } else{
            res.send("Invalid login details : Password")
        }

    } catch (error) {
        res.status(400).send("Invalid login details")
    }
})


/* const jwt = require("jsonwebtoken");

const createToken = async() =>{
    const token = await jwt.sign({_id: "211321434423"} , "secretkey",expiresIn )
    console.log(token);

    const userVer = await jwt.verify(token,"secretkey")
    console.log(userVer);
} */

//createToken();


app.listen(PORT , ()=> {
    console.log(`Server is running at : ${PORT}`);
})