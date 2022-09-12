const router = require("express").Router();
const generateToken = require("../middleware/Generatejson");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
// Sign Up
router.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already Exists" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      name,
      password: hashPassword,
    });
    if (newUser) {
      await res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  } catch (error) {
    res.json(error);
  }
});

// Login-------
//@route /api/users/login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/vedo", (req, res) => res.json("U are a vedo"));
module.exports = router;
