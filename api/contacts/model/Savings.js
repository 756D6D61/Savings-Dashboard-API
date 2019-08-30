'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingsSchema = new Schema({
    acount_name: { type: String, required: true },
    account_type: { type: String, required: true },
    interest: { type: Number, required: true },
    savings_goals: { type: Number, required: true }
});

module.exports = mongoose.model('Contact', SavingsSchema);