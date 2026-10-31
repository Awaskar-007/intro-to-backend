import express from "express";

const app = express(); // create an express application
app.use(express.json()); // middleware to parse JSON request bodies

//routes import
import userRoutes from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/users", userRoutes); // use the user routes for /api/users endpoint

// example route: https://localhost:3000/api/v1/users/register


export default app;