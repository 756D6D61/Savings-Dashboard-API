'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Savings = require('../model/Savings');
const router = express.Router();

router.route('/')
    .post((req, res) => {
        const contact = new Savings (req.body);
        contact.save((err, save) => {
            if(err) {
                res.status(400).json(err);
            }
            res.json(save);
        })
    })

    module.exports = router;
