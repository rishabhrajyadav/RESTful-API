const jwt = require("jsonwebtoken")
const Employee = require("../models/registers");

const auth = async(req,res,next) => {
  try {
     const token = req.cookies.jwt;
     const verifyUser = await jwt.verify(token , process.env.SECRET_KEY);
     console.log(verifyUser);

     const user = await Employee.findOne({_id : verifyUser._id})
     console.log(user.firstname);
     
     //saved the data in req
     req.token = token;
     req.user = user;
     next();
  } catch (error) {
    res.status(401).send(error)
  }
}

module.exports = auth;