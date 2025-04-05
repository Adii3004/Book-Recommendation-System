require("dotenv").config();
console.log("API Key Loaded:", process.env.OPENROUTER_API_KEY ? "Yes" : "No");

const express = require("express");
const cors = require("cors");
const bookRoutes = require("./api");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Book Recommendation API is running!");
  });
  