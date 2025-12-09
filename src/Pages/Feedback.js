import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Paper,
} from "@mui/material";

const Feedback = () => {
  const [rating, setRating] = React.useState(4);

  return (
    <Box
      sx={{
        backgroundColor: "#F4F8FB",
        py: 8,
        px: { xs: 3, md: 10 },
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "100%", sm: "80%", md: "60%" },
          p: 5,
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#1E88E5",
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
            letterSpacing: 1,
          }}
        >
          Share Your Feedback
        </Typography>

        <Typography sx={{ mb: 2, color: "#555" }}>
          We value your feedback! Tell us how we can improve the CityVision
          experience.
        </Typography>

        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />
        <TextField
          label="Your Feedback"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Rating */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Rate Your Experience
          </Typography>
          <Rating
            name="feedback-rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            size="large"
            sx={{ color: "#1E88E5" }}
          />
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#1E88E5",
            color: "white",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "25px",
            py: 1.5,
            fontSize: "16px",
            "&:hover": { backgroundColor: "#00E5FF", color: "black" },
          }}
          onClick={() => alert("Thank you for your feedback!")}
        >
          Submit Feedback
        </Button>
      </Paper>
    </Box>
  );
};

export default Feedback;
