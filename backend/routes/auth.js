const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "HarryisagoodB$oy";
// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
  let  success = true
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

    // Route 2 : Authenticate a user : POST "/api/auth/login". No login required
    router.post(
      "/login",
      [
        body("email", "Enter valid email").isEmail(),
        body("password", "Password cannot be blanked").exists(),
      ],
      async (req, res) => {
        // If there are errors return bad req and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
          let user = await User.findOne({ email });
          if (!user) {
            let success = false
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
          }

          const passwordcompare = await bcrypt.compare(password, user.password);
          if (!passwordcompare) {
            let success = false
            return res.status(400).json({ success,error: "Please try to login with correct credentials" });
          }

          const data = {
            user: {
              id: user.id,
            },
          };

          const authToken = jwt.sign(data, JWT_SECRET);

          // res.json(user)
          let success = true;
          res.json({ success, authToken });
        } catch (error) {
          console.error(error.message);
          res.status(500).send("Internal Server Error");
        }
      }
    );


// Route 3 : Get logged in user details : POST "/api/auth/getuser". login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
  let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    let success = true
     res.send(user)

  } catch (error) {
    let success = false
    console.error(error.message);
    res.status(500).json({success, error:"Internal Server Error"});
  }
});

module.exports = router;
