const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("../src/auth_config.json");

// Get Models
const User = require("../models/User");
const Data = require("../models/Data");

// Configure Express Router
const router = express.Router();

// Check our JSON web token for API
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
router.post("/test", checkJwt, (req, res) => {
  const user = req.body.user;
  res.send(user);
});

// CRUD Database
// Create Data
router.post("/", checkJwt, async (req, res) => {
  const { item, email } = req.body;
  const serverUser = await User.findOne({ email: email });

  try {
    const newData = new Data({
      item,
      user: serverUser, //this user comes from the server not Auth0
    });

    const data = await newData.save();
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Read Data
router.get("/:email", checkJwt, async (req, res) => {
  const userInfo = await User.findOne({ email: req.params.email });
  try {
    const data = await Data.findOne({ user: userInfo._id })
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update Data
router.put("/", checkJwt, async (req, res) => {
  const update = { item: req.body.item };
  const userInfo = await User.findOne({ email: req.body.email });
  try {
    const data = await Data.findOneAndUpdate(
      { user: userInfo._id },
      update
    ).sort({
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
router.delete("/", checkJwt, async (req, res) => {
  const userInfo = await User.findOne({ email: req.body.email });
  try {
    const data = await Data.findOneAndDelete({ user: userInfo._id }).sort({
      field: "asc",
      _id: -1,
    });

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// User Routes
// Add new user or return existing user information
router.post("/user", checkJwt, async (req, res) => {
  const { user } = req.body;

  try {
    const userInfo = await User.findOne({ email: user.email });
    if (userInfo === null) {
      const newUser = new User({
        name: user.name,
        email: user.email,
      });
      const userInfo = await newUser.save();
      res.send(userInfo);
    } else {
      // Get and update the most recent login
      const userInfo = await User.findOneAndUpdate(
        { email: user.email },
        { lastLogin: Date.now() }
      );
      console.log(userInfo);
      res.send(userInfo);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
