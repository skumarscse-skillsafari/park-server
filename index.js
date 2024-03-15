import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to Express Blog App" });
});

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server is running in: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(error));
