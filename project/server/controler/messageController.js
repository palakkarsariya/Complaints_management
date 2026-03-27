import Message from "../Models/message.js";

/* Send Message */

export const sendMessage = async(req,res)=>{

try{

const newMessage = new Message(req.body);

await newMessage.save();

res.status(201).json({
success:true,
message:"Message sent successfully"
});

}catch(error){

res.status(500).json({
message:"Error sending message"
});

}

};


/* Get Messages for Admin */

export const getMessages = async(req,res)=>{

try{

const messages = await Message.find().sort({createdAt:-1});

res.json(messages);

}catch(error){

res.status(500).json({
message:"Error fetching messages"
});

}

};


/* Delete Message */

export const deleteMessage = async(req,res)=>{

try{

await Message.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Message deleted"
});

}catch(error){

res.status(500).json({
message:"Error deleting message"
});

}

};