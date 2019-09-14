const express = require('express');
const mongoose = require('mongoose');
const Savings = require('../model/Savings');
const router = express.Router();

router.route('/')
  .post((req, res) => {

    const savings = new Savings(req.body);

    savings.save((err, contact) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(contact);
      // res.json({ message: 'Contact saved! '});
    });
    
  });

module.exports = router;
