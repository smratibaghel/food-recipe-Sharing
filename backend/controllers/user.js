import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register=  async(req, res) => {

  const { name, email, password } = req.body;
  try{
    let user=await User.findOne({email})

    if(user) return res.json({message:"User already exist"});

    const hashPass=await bcrypt.hash(password,10)
    
    user=await User.create({name,email,password:hashPass})
    res.json(
    { message: "Registered Successfully",name, email }
  );
  } catch(error){
      console.error("Something went wrong",error);
  }
  
}

export const login=  async(req, res) => {
  const {email,password}=req.body
  try {
       let user=await User.findOne({email});

       if(!user) return res.json({message:"User not exist"});

       const validPass=await bcrypt.compare(password,user.password);
       if (!validPass) return res.json({message:"Password is incorrect"});

       const token= jwt.sign({userId:user._id},"!@#$%^&*()",{
        expiresIn:'1d'       
       })
       res.json({message:`Welcome ${user.name}`,token})
  } catch (error) {
    res.json({message:error.message})
  }
}

export const profile=async (req,res)=>{
    res.json({user:req.user});
}