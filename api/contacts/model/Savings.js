'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingsSchema = new Schema({
    account_name: { type: String, required: true },
    account_type: { type: String, required: true },
    interest: { type: Number, required: true },
    savings_amount: { type: Number, required: true }
})

module.exports = mongoose.model('Savings', SavingsSchema);