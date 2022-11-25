const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const connectDB = require("./config/db");

// Get models
const User = require("./models/User");
const Data = require("./models/Data");

const app = express();

// New in Express. No longer require body parser
app.use(express.json());

// Connect Database
connectDB();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

// Check our auth_config.json
if (
  !authConfig.domain ||
  !authConfig.audience ||
  authConfig.audience === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

// Init Middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

// Check our JSON web token
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

// Get api requests for test
app.post("/api/external/test", checkJwt, (req, res) => {
  const user = req.body.user;
  res.send(user);
});

// Create Data
app.post("/api/external", checkJwt, async (req, res) => {
  const { item } = req.body;

  try {
    const newData = new Data({
      item,
      //user: "007", //does this id come from mongoose or from Auth0
    });

    // Maybe I need to call the DB when they first login to save their info and give them an ID in Mongo.

    const data = await newData.save();
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Read Data
app.get("/api/external", checkJwt, async (req, res) => {
  try {
    const data = await Data.findOne().sort({ field: "asc", _id: -1 }).limit(1);
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Data
app.put("/api/external", checkJwt, async (req, res) => {
  const update = { item: req.body.item };
  try {
    const data = await Data.findOneAndUpdate(update).sort({
      field: "asc",
      _id: -1,
    });

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Data
app.delete("/api/external", checkJwt, async (req, res) => {
  try {
    const data = await Data.findOneAndDelete().sort({
      field: "asc",
      _id: -1,
    });

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => console.log(`API Server listening on port ${port}`));
