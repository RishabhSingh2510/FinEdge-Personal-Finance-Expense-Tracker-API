const transactionModel = require("../models/transactionModel");

exports.createTransaction = async (data) => {
  return transactionModel.saveTransaction(data);
};

exports.getTransactions = async () => {
  return transactionModel.getAllTransactions();
};

exports.getTransaction = async (id) => {
  const data = await transactionModel.getAllTransactions();
  return data.find((t) => t.id === id);
};

exports.updateTransaction = async (id, update) => {
  return transactionModel.updateTransaction(id, update);
};

exports.deleteTransaction = async (id) => {
  return transactionModel.deleteTransaction(id);
};