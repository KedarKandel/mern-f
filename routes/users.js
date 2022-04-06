const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//register a user

router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save new user and send response

    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  return;
});

//authenticate the user

router.post("/login", async (req, res) => {
  try {
    //find the user
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(400).json("Wrong username or password");
      return;
    }
    // !user && res.status(400).json("Wrong username or password");

    // validate password
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json("Wrong username or password");
        return;
      }
    }

    // !validPassword && res.status(400).json("Wrong username or password");

    //send res
    res.status(200).json({ _id: user._id, username: user.username });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
  return;
});

module.exports = router;
