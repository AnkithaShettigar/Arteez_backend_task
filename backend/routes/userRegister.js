const express = require('express');
const User = require('../Model/User');
const router = express.Router();
//Register
router.post('/register', async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  const data = {
    name: name,
    email: email,
    password: password,
    cpassword: cpassword,
  };

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json('exists');
    } else {
      res.json('not exists');
      await User.insertMany([data]);
    }
  } catch (error) {
    res.json('not exists');
    console.log(error);
  }
});

//Login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await User.findOne({ email: email });

    if (check) {
      res.json('exists');
    } else {
      res.json('not exists');
    }
  } catch (error) {
    res.json('not exists');
    console.log(error);
  }
});

module.exports = router;
