require('dotenv').config();
console.log("Loaded SESSION_SECRET:", process.env.SESSION_SECRET);
console.log("Loaded PIN:", process.env.PIN);

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;
const CORRECT_PIN = process.env.PIN;

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Login route
app.post("/login", (req, res) => {
  const { pin } = req.body;
  if (pin === CORRECT_PIN) {
    req.session.loggedIn = true;
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Incorrect PIN" });
  }
});

// Protected secret route
app.get("/secret", (req, res) => {
  if (req.session.loggedIn) {
    res.json({
      success: true,
      html: `<h3>Welcome to the secret area</h3><p>You are logged in.</p><button onclick="logout()">Logout</button>`
    });
  } else {
    res.status(403).json({ success: false, message: "Not authorized" });
  }
});

// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
