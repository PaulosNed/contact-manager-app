const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CreateUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPAssword = await bcypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPAssword });
  // console.log("newUser", newUser)
  res.status(201).json({
    accessToken: jwt.sign(
      {
        user: {
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          __v: newUser.__v,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    ),
  });
});

const Login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const currUser = User.findOne({ email });

  if (!currUser || (await !bcypt.compare(password, currUser.password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  } else {
    const accessToken = jwt.sign(
      {
        user: {
          createdAt: currUser.createdAt,
          updatedAt: currUser.updatedAt,
          __v: currUser.__v,
          _id: currUser._id,
          name: currUser.name,
          email: currUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ accessToken });
  }
});

module.exports = { CreateUser, Login };
