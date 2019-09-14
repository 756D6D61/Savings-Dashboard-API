'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Savings = require('../model/Savings');
const router = express.Router();

router.route('/:id')
  .put((req, res) => {

    const _id = req.params.id;

    Savings.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, save) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(save);
    });

  });

module.exports = router;