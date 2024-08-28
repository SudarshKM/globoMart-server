const users = require('../model/userModel')
const jwt = require('jsonwebtoken')

//register

exports.registerController= async(req,res)=>{
   const {username , email , password} = req.body;

   try {

    const existingUser = await users.findOne({email , password})

    if(existingUser){
        res.status(406).json("User already exist")
    } else {
        const newUser = new users({
            username,
            email,
            password
        })

        await newUser.save();

        res.status(200).json(newUser)
    }
    
   } catch (error) {
    res.status(401).json(error)
   }
}

exports.loginController=async(req,res)=>{
    const {email , password} =req.body;

     try {
        const existingUser = await users.findOne({email , password})

        if(existingUser){
            const token = jwt.sign({userId:existingUser._id},'secretKey')

            console.log(token);
            

            res.status(200).json({existingUser,token})

        }else{
            res.status(406).json("incorrect email or password")
        }

     } catch (error) {
        res.status(401).json(error)
     }

}