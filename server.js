const express = require('express');
const cors = require('cors');
const path = require("path");

const inventory = require("./routes/api/inventory");
const shipment = require("./routes/api/shipment");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Routes
app.use("/api/inventory", inventory);
app.use("/api/shipment", shipment);

// Configure Express to also serve frontend
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;