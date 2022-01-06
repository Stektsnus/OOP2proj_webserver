const express = require("express");
const mongoose = require("mongoose");

const app = new express();

mongoose
    .connect(`mongodb://sebastian:password@database:27017/?authSource=admin`)
    .then(() => console.log("Successfully connected to DB"))
    .catch(() => console.log(e));

const userRoutes = require("./routes/userRoutes.js")

app.get("/", (req, res) => {
    res.send("<h1>Testing</h1>");
});


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));