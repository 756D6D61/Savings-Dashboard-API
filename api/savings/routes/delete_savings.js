'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Savings = require('../model/Savings');
const router = express.Router();

router.route('/:id')
    .delete((req, res) => {
        const _id = req.params.id;
        Savings.findOneAndRemove({ _id }, (err, save) => {
            if(err) {
                res.status(400).json(err);
            }
            if(!save) {
                res.status(404).json({ message: 'Savings not found,' });
            }
            res.json({ message: `Savings ${save._id} deleted.` })
        })
    })

    module.exports = router;