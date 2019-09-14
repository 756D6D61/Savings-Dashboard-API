'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Savings = require('../model/Savings');
const router = express.Router();

router.route('/')
    .get((req,res) => {
        Savings.find({}, (err, save) => {
            if(err) {
                res.status(400).json(error);
            }
            res.json(save);
        })
    })

    module.exports = router;