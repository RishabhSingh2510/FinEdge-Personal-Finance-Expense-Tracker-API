const transactionService = require("../services/transactionService");

exports.createTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.createTransaction(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        next(err);
    }
};

exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await transactionService.getTransactions();
        res.json(transactions);
    } catch (err) {
        next(err);
    }
};

exports.getTransaction = async (req, res, next) => {
    try {
        const transaction = await transactionService.getTransaction(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(transaction);
    } catch (err) {
        next(err);
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const updated = await transactionService.updateTransaction(
            req.params.id,
            req.body
        );

        if (!updated) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
};

exports.deleteTransaction = async (req, res, next) => {
    try {
        await transactionService.deleteTransaction(req.params.id);
        res.json({ message: "Transaction deleted" });
    } catch (err) {
        next(err);
    }
};