const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


//Models
const UserObject = require('../models/User');

// Get OTP
router.post('/', (req, res, next) => {
  const {
    email
  } = req.body;
  const num = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  const otp = num.toString();
  bcrypt.hash(otp, 10).then((hash) => {
    const promise = UserObject.updateOne({
      email
    }, {
      email: email,
      otp: hash
    }, {
      upsert: true
    });
    promise.then((user) => {
      let transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
      });
      let mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: email,
        subject: otp + ' is your one time password.',
        text: "Dear user. This is your one time password: " + otp
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({
            success: false,
            message: "Something went wrong. Try again later."
          });
          return console.log(error);
        } else {
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          console.log("otp:" + otp);

          const payload = {
            email
          };
          const token = jwt.sign(payload, process.env.TEMPORARILYTOKENKEY, {
            expiresIn: 900 // This token expires 15 minutes later.  
          });

          res.status(200).json({
            success: true,
            message: "If your address is correct, you will receive an email!",
            token: token
          });

        }

      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Something went wrong. Try again later."
      });
    });
  });

});

module.exports = router;