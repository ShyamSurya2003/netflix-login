const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// temporary user storage
let users = [];

// test route (optional)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// 🔐 SIGNUP API
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });

  console.log("Users:", users);

  res.json({ message: "Signup successful" });
});


// 🔐 LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});


// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});