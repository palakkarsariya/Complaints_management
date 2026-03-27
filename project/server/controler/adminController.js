import Admin from "../Models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async(req,res)=>{

  try{

    const {email,password} = req.body;

    // console.log(req.body);
    const admin = await Admin.findOne({email});

    if(!admin){
      return res.status(404).json({
        success:false,
        message:"Admin not found"
      });
    }

    const isMatch = await bcrypt.compare(password,admin.password);

    if(!isMatch){
      return res.status(400).json({
        success:false,
        message:"Invalid password"
      });
    }

    const token = jwt.sign(
      {id:admin._id},
      "cityvisionSecret",
      {expiresIn:"1d"}
    );

    res.json({
      success:true,
      token,
      admin
    });

  }catch(error){

    res.status(500).json({
      message:"Server error"
    });

  }

};