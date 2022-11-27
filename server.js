const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const authConfig = require("./src/auth_config.json");
const connectDB = require("./config/db");
const api = require("./routes/api");

// Connect Database
connectDB();

const app = express();

// New in Express. No longer require body parser
app.use(express.json());

// Set Server Port
const port = process.env.PORT || 3001;

// Middleware
app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Check if we are in production
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: authConfig.appOrigin }));
} else {
  app.use(cors({ origin: "http://localhost:3000" }));
}

// Access Build Folders
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Define Routes for api
app.use("/api", api);

app.listen(port, () => console.log(`Server listening on port ${port}`));
