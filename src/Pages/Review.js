import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
  Grid,
  Avatar,
  Snackbar,
  Alert
} from "@mui/material";

import axios from "axios";

const Review = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    review: ""
  });

  const [reviews, setReviews] = useState([]);

  const [alert, setAlert] = useState({
    open:false,
    message:"",
    severity:"success"
  });

  useEffect(()=>{
    fetchReviews();
  },[]);

  const fetchReviews = async()=>{
    try{
      const res = await axios.get("http://localhost:1300/api/review/get");
      setReviews(res.data);
    }catch(error){
      console.log(error);
    }
  };

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async()=>{

    if(!form.name || !form.email || !form.review || form.rating === 0){
      setAlert({
        open:true,
        message:"Please complete all fields",
        severity:"warning"
      });
      return;
    }

    try{

      await axios.post(
        "http://localhost:1300/api/review/add",
        form
      );

      setAlert({
        open:true,
        message:"Thank you for your feedback!",
        severity:"success"
      });

      setForm({
        name:"",
        email:"",
        rating:0,
        review:""
      });

      fetchReviews();

    }catch(error){

      setAlert({
        open:true,
        message:"Error submitting review",
        severity:"error"
      });

    }

  };

  return (
    <Box sx={{py:8, px:{xs:3, md:10}, background:"#F4F8FB"}}>

      {/* Title */}

      <Typography
        variant="h4"
        sx={{
          textAlign:"center",
          color:"#1E88E5",
          fontWeight:700,
          mb:6
        }}
      >
        Citizen Reviews
      </Typography>

      <Grid container spacing={5}>

        {/* Review Form */}

        <Grid item xs={12} md={4} sx={{
            marginLeft:"280px"
        }}>

          <Paper sx={{p:4, borderRadius:3}}>

            <Typography
              variant="h6"
              sx={{mb:3, color:"#1E88E5"}}
            >
              Share Your Feedback
            </Typography>

            <TextField
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <Typography sx={{mb:1}}>Rating</Typography>

            <Rating
              value={form.rating}
              onChange={(e,newValue)=>
                setForm({...form, rating:newValue})
              }
              sx={{mb:3}}
            />

            <TextField
              label="Write Review"
              name="review"
              multiline
              rows={4}
              value={form.review}
              onChange={handleChange}
              fullWidth
              sx={{mb:3}}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                background:"#1E88E5",
                py:1.5,
                borderRadius:"25px",
                fontWeight:600,
                "&:hover":{
                  background:"#00E5FF",
                  color:"black"
                }
              }}
            >
              Submit Review
            </Button>

          </Paper>

        </Grid>

        {/* Reviews List */}

        <Grid item xs={12} md={8}>

          <Grid container spacing={3}>

            {reviews.map((r)=>(
              <Grid item xs={12} md={6} key={r._id}>

                <Paper
                  sx={{
                    p:3,
                    borderRadius:3,
                    height:"100%",
                    boxShadow:"0 6px 20px rgba(0,0,0,0.1)"
                  }}
                >

                  <Box
                    sx={{
                      display:"flex",
                      alignItems:"center",
                      mb:2
                    }}
                  >

                    <Avatar sx={{mr:2, bgcolor:"#1E88E5"}}>
                      {r.name.charAt(0).toUpperCase()}
                    </Avatar>

                    <Box>

                      <Typography fontWeight={600}>
                        {r.name}
                      </Typography>

                      <Rating
                        value={r.rating}
                        readOnly
                        size="small"
                      />

                    </Box>

                  </Box>

                  <Typography color="text.secondary">
                    {r.review}
                  </Typography>

                </Paper>

              </Grid>
            ))}

          </Grid>

        </Grid>

      </Grid>

      {/* Alert */}

      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={()=>setAlert({...alert,open:false})}
      >
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>

    </Box>
  );

};

export default Review;