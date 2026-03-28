import React,{useEffect,useState} from "react";
import axios from "axios";

import {
Box,
Typography,
Table,
TableHead,
TableRow,
TableCell,
TableBody,
Paper,
IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const Messages = ()=>{

const [messages,setMessages] = useState([]);

useEffect(()=>{

fetchMessages();

},[]);

const fetchMessages = async()=>{

const res = await axios.get(
"https://citivision-backend.onrender.com/api/message/get"
);

setMessages(res.data);

};

const handleDelete = async(id)=>{

await axios.delete(
`https://citivision-backend.onrender.com/api/message/delete/${id}`
);

fetchMessages();

};

return(

<Box sx={{
        backgroundColor: "#F4F8FB",
        py: 6,
        px: { xs: 2, md: 10 },
        marginLeft: "180px",
      }}>

<Typography variant="h4" sx={{mb:4}}>
Contact Messages
</Typography>

<Paper>

<Table>

<TableHead sx={{background:"#1976d2"}}>

<TableRow>

<TableCell sx={{color:"white"}}>Name</TableCell>
<TableCell sx={{color:"white"}}>Email</TableCell>
<TableCell sx={{color:"white"}}>Subject</TableCell>
<TableCell sx={{color:"white"}}>Message</TableCell>
<TableCell sx={{color:"white"}}>Action</TableCell>

</TableRow>

</TableHead>

<TableBody>

{messages.map((m)=>(
<TableRow key={m._id}>

<TableCell>{m.name}</TableCell>

<TableCell>{m.email}</TableCell>

<TableCell>{m.subject}</TableCell>

<TableCell>{m.message}</TableCell>

<TableCell>

<IconButton
color="error"
onClick={()=>handleDelete(m._id)}
>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>
))}

</TableBody>

</Table>

</Paper>

</Box>

);

};

export default Messages;