// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors"
// import { connectDB } from "./lib/db.js"; // Ensure the path is correct
// import authRoutes from "./routes/auth.route.js"; // Ensure the path is correct
// import messageRoutes from "./routes/message.route.js"; // Ensure the path is correct
// import { server } from "./lib/socket.js";

// dotenv.config(); // Load environment variables from .env file
// const app = express();

// // Set up the port
// const PORT = process.env.PORT || 5000; // Use a default value of 5000 if PORT is not set

// // Middleware
// app.use(express.json()); // Parse incoming JSON requests
// app.use(cookieParser()); // Parse cookies
// app.use(cors(
//   {
//     origin: "http://localhost:5173",
//     credentials:true
//   }
// ));
// // Routes
// app.use("/api/auth", authRoutes); // Authentication routes
// app.use("/api/messages", messageRoutes); // Message routes

// // Connect to the database and start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
//   connectDB(); // Make sure your connectDB function is working correctly
// });


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});