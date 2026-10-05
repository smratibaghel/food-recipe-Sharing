import User from '../models/Users.js'
import jwt from 'jsonwebtoken'

export const Authentication= async(req , res ,next)=>{
    const token=req.header("Auth")

    try {
        if(!token) return res.json({message:"Login First"});

        const decode= jwt.verify(token,"!@#$%^&*()")

        //console.log(decode)
        const id =decode.userId;
        let user= await User.findById(id)
        if(!user) return res.json({message:"User does not exist"});

        req.user=user;

        next();
    } catch (error) {
        res.json({message:error.message})
        console.log(error)
    }
}