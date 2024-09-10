const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/getTran', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// POST a new transaction
router.post('/addtran', async (req, res) => {
    const { description, amount } = req.body;
    try {
        const newTransaction = new Transaction({ description, amount });
        await newTransaction.save();
        res.json(newTransaction);
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// DELETE a transaction by ID
router.delete('/deletetran/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ msg: 'Transaction not found' });
        }
        await transaction.remove();
        res.json({ msg: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
