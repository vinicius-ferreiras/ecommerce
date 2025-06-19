import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/", express.static("./static"));
app.use("/users", userRoutes);

export default app;
