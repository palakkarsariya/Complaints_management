import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

const DepartmentDashboard = () => {

  const [complaints,setComplaints] = useState([]);

  const department = localStorage.getItem("department");
  const zone = localStorage.getItem("zone");

  useEffect(()=>{

    const fetchComplaints = async ()=>{

      const res = await axios.get(
        "https://citivision-backend.onrender.com/api/Comp/department",
        {
          params:{
            category:department,
            zone:zone
          }
        }
      );

      setComplaints(res.data);

    };

    fetchComplaints();

  },[]);

  const total = complaints.length;
  const pending = complaints.filter(c=>c.status==="Pending").length;
  const progress = complaints.filter(c=>c.status==="In Progress").length;
  const resolved = complaints.filter(c=>c.status==="Resolved").length;

  const latestComplaints = complaints.slice(-5).reverse();

  return (

    <Box sx={{p:4}}>

      <Typography variant="h4" sx={{mb:3,fontWeight:700}}>
        {department} Dashboard
      </Typography>

      <Typography sx={{mb:4,color:"gray"}}>
        Zone: {zone}
      </Typography>

      {/* Statistics Cards */}

      <Grid container spacing={3}>

        <Grid item xs={3}>
          <Paper sx={{p:3,textAlign:"center"}}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h4">{total}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{p:3,textAlign:"center"}}>
            <Typography variant="h6">Pending</Typography>
            <Typography variant="h4">{pending}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{p:3,textAlign:"center"}}>
            <Typography variant="h6">In Progress</Typography>
            <Typography variant="h4">{progress}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper sx={{p:3,textAlign:"center"}}>
            <Typography variant="h6">Resolved</Typography>
            <Typography variant="h4">{resolved}</Typography>
          </Paper>
        </Grid>

      </Grid>


      {/* Latest Complaints */}

      <Box sx={{mt:6}}>

        <Typography variant="h5" sx={{mb:2}}>
          Latest Complaints
        </Typography>

        <Paper>

          <Table>

            <TableHead sx={{background:"#1976d2"}}>

              <TableRow>

                <TableCell sx={{color:"white"}}>Category</TableCell>
                <TableCell sx={{color:"white"}}>Location</TableCell>
                <TableCell sx={{color:"white"}}>Date</TableCell>
                <TableCell sx={{color:"white"}}>Status</TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {latestComplaints.map((c)=>(
                <TableRow key={c._id}>

                  <TableCell>{c.category}</TableCell>

                  <TableCell>{c.location}</TableCell>

                  <TableCell>
                    {new Date(c.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={c.status}
                      color={
                        c.status==="Resolved"
                        ?"success"
                        :c.status==="In Progress"
                        ?"warning"
                        :"error"
                      }
                    />

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </Paper>

      </Box>

    </Box>
  );

};

export default DepartmentDashboard;