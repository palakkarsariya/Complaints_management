import React, { useEffect, useState } from "react";
import axios from "axios";

import {
Box,
Typography,
Paper,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TableRow,
IconButton,
Button,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
TextField,
MenuItem
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const DepartmentUsers = () => {

const [users,setUsers] = useState([]);
const [open,setOpen] = useState(false);
const [editId,setEditId] = useState(null);

const [form,setForm] = useState({
name:"",
email:"",
password:"",
department:"",
zone:""
});

const departments = [
"Water Supply",
"Electricity",
"Garbage Issue",
"Road Damage"
];

const zones = [
"Central Zone",
"North Zone",
"South Zone",
"East Zone",
"West Zone",
"South West Zone",
"South East Zone"
];

useEffect(()=>{

fetchUsers();

},[]);

const fetchUsers = async()=>{

const res = await axios.get(
"http://localhost:1300/api/departmentUser/get"
);

setUsers(res.data);

};

const handleOpen = ()=>{

setOpen(true);

};

const handleClose = ()=>{

setOpen(false);
setEditId(null);

setForm({
name:"",
email:"",
password:"",
department:"",
zone:""
});

};

const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};

const handleSubmit = async()=>{

if(editId){

await axios.put(
`http://localhost:1300/api/departmentUser/update/${editId}`,
form
);

}else{

await axios.post(
"http://localhost:1300/api/departmentUser/add",
form
);

}

fetchUsers();

handleClose();

};

const handleEdit = (user)=>{

setEditId(user._id);

setForm({
name:user.name,
email:user.email,
password:user.password,
department:user.department,
zone:user.zone
});

setOpen(true);

};

const handleDelete = async(id)=>{

if(window.confirm("Delete this user?")){

await axios.delete(
`http://localhost:1300/api/departmentUser/delete/${id}`
);

fetchUsers();

}

};

return(

<Box sx={{
        backgroundColor: "#F4F8FB",
        py: 6,
        px: { xs: 2, md: 10 },
        marginLeft: "180px",
      }}>

<Typography variant="h4" sx={{mb:4,fontWeight:700}}>
Department Users Management
</Typography>

<Button
variant="contained"
startIcon={<AddIcon/>}
onClick={handleOpen}
sx={{mb:3}}
>
Add Department User
</Button>

<TableContainer component={Paper}>

<Table>

<TableHead sx={{background:"#1976d2"}}>

<TableRow>

<TableCell sx={{color:"white"}}>Name</TableCell>
<TableCell sx={{color:"white"}}>Email</TableCell>
<TableCell sx={{color:"white"}}>Department</TableCell>
<TableCell sx={{color:"white"}}>Zone</TableCell>
<TableCell sx={{color:"white"}}>Actions</TableCell>

</TableRow>

</TableHead>

<TableBody>

{users.map((user)=>(
<TableRow key={user._id}>

<TableCell>{user.name}</TableCell>

<TableCell>{user.email}</TableCell>

<TableCell>{user.department}</TableCell>

<TableCell>{user.zone}</TableCell>

<TableCell>

<IconButton
color="primary"
onClick={()=>handleEdit(user)}
>
<EditIcon/>
</IconButton>

<IconButton
color="error"
onClick={()=>handleDelete(user._id)}
>
<DeleteIcon/>
</IconButton>

</TableCell>

</TableRow>
))}

</TableBody>

</Table>

</TableContainer>

{/* Dialog */}

<Dialog open={open} onClose={handleClose} fullWidth>

<DialogTitle>
{editId ? "Update Department User" : "Add Department User"}
</DialogTitle>

<DialogContent>

<TextField
label="Name"
name="name"
fullWidth
margin="normal"
value={form.name}
onChange={handleChange}
/>

<TextField
label="Email"
name="email"
fullWidth
margin="normal"
value={form.email}
onChange={handleChange}
/>

<TextField
label="Password"
name="password"
fullWidth
margin="normal"
value={form.password}
onChange={handleChange}
/>

<TextField
select
label="Department"
name="department"
fullWidth
margin="normal"
value={form.department}
onChange={handleChange}
>

{departments.map((d)=>(
<MenuItem key={d} value={d}>
{d}
</MenuItem>
))}

</TextField>

<TextField
select
label="Zone"
name="zone"
fullWidth
margin="normal"
value={form.zone}
onChange={handleChange}
>

{zones.map((z)=>(
<MenuItem key={z} value={z}>
{z}
</MenuItem>
))}

</TextField>

</DialogContent>

<DialogActions>

<Button onClick={handleClose}>
Cancel
</Button>

<Button
variant="contained"
onClick={handleSubmit}
>
Save
</Button>

</DialogActions>

</Dialog>

</Box>

);

};

export default DepartmentUsers;