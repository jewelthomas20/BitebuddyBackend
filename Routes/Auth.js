const express = require('express');
const router = express.Router();
const user = require('../models/Users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.jwtSecret

// =====================Create/Signup========================================
router.post('/createuser', [
  body('name', 'Enter a name with minimum 3 characters').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Enter a password with minimum 3 characters').isLength({ min: 5 }),
  body('location', 'Enter a valid location').isLength({ min: 3 }),

], async (req, res) => {
  const errors = validationResult(req);
  var salt = bcrypt.genSaltSync(10);
  var hashPassword = bcrypt.hashSync(req.body.password, salt);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const User = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    location: req.body.location
  })
  return await res.json({ success: true })
})
// =====================Login========================================

router.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const { email, password } = req.body;
    const User = await user.findOne({ email })
    if (!User) return res.status(401).json({ error: "Enter Valid Credentials" })

    const data = {
      user: { id: User.id }
    }
    const comparedPassword = bcrypt.compareSync(password, User.password)

    if (comparedPassword) {
      let authtoken = jwt.sign(data, jwtSecret);
      let location = User.location;
      //location sent to populate location field while checkout
      return res.status(200).json({ success: true, authtoken, location })
    }

    else return res.status(401).json({ error: "Enter Valid Credentials" })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router;