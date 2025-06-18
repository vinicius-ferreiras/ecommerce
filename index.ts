import express from "express";
import path from "path";

const port: Number = Number(process.env.PORT) || 3000;
const app = express();
app.use(express.static("./static"));

app.get("/", (req, res) => {
  res.sendFile("./static/index.html");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});