import express from "express";
import cors from "cors";
import db from "./db/db.js";
import userroute from "./Routes/Userroute.js";
import comproute from "./Routes/Compalintroute.js";
import departAuth from "./Routes/departmentAuthRoute.js";
import resetpassword from "./Routes/resetpassword.js";
import departmentUserRoute from "./Routes/departmentUserRoute.js";
import messageRoute from "./Routes/messageRoute.js";
import reviewRoute from "./Routes/reviewRoute.js"
import adminRoute from "./Routes/adminRoute.js";

// Connect DB
db();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/User", userroute);
app.use("/api/Comp", comproute);
app.use("/uploads", express.static("uploads"));
app.use("/api/", resetpassword); // <-- Reset Password API
app.use("/api/auth", departAuth); 
app.use("/api/departmentUser",departmentUserRoute);
app.use("/api/review",reviewRoute);
app.use("/api/message",messageRoute);
app.use("/api/admin",adminRoute);

// Server Listen
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
