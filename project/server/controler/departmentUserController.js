import DepartmentUser from "../Models/departmentUser.js";

/* Add Department User */

export const addDepartmentUser = async(req,res)=>{

  try{

    const user = new DepartmentUser(req.body);

    await user.save();

    res.status(201).json({
      success:true,
      message:"Department user created",
      user
    });

  }catch(error){

    res.status(500).json({message:"Error creating department user"});

  }

};


/* Get All Department Users */

export const getDepartmentUsers = async(req,res)=>{

  try{

    const users = await DepartmentUser.find();

    res.json(users);

  }catch(error){

    res.status(500).json({message:"Error fetching users"});

  }

};


/* Update Department User */

export const updateDepartmentUser = async(req,res)=>{

  try{

    const updated = await DepartmentUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(updated);

  }catch(error){

    res.status(500).json({message:"Error updating user"});

  }

};


/* Delete Department User */

export const deleteDepartmentUser = async(req,res)=>{

  try{

    await DepartmentUser.findByIdAndDelete(req.params.id);

    res.json({
      success:true,
      message:"Department user deleted"
    });

  }catch(error){

    res.status(500).json({message:"Error deleting user"});

  }

};