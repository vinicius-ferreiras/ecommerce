import express from "express";

const port: Number = Number(process.env.PORT) || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Ecommerce project");
}
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});