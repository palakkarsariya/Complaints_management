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

const Reviews = ()=>{

const [reviews,setReviews] = useState([]);

useEffect(()=>{

fetchReviews();

},[]);

const fetchReviews = async()=>{

const res = await axios.get(
"https://citivision-backend.onrender.com/api/review/get"
);

setReviews(res.data);

};

const handleDelete = async(id)=>{

await axios.delete(
`https://citivision-backend.onrender.com/api/review/delete/${id}`
);

fetchReviews();

};

return(

<Box sx={{
        backgroundColor: "#F4F8FB",
        py: 6,
        px: { xs: 2, md: 10 },
        marginLeft: "180px",
      }}>

<Typography variant="h4" mb={4}>
User Reviews
</Typography>

<Paper>

<Table>

<TableHead sx={{background:"#1976d2"}}>

<TableRow>

<TableCell sx={{color:"white"}}>Name</TableCell>
<TableCell sx={{color:"white"}}>Email</TableCell>
<TableCell sx={{color:"white"}}>Rating</TableCell>
<TableCell sx={{color:"white"}}>Review</TableCell>
<TableCell sx={{color:"white"}}>Action</TableCell>

</TableRow>

</TableHead>

<TableBody>

{reviews.map((r)=>(
<TableRow key={r._id}>

<TableCell>{r.name}</TableCell>
<TableCell>{r.email}</TableCell>
<TableCell>{r.rating} ⭐</TableCell>
<TableCell>{r.review}</TableCell>

<TableCell>

<IconButton
color="error"
onClick={()=>handleDelete(r._id)}
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

export default Reviews;