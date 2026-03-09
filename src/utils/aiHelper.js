exports.savingTips = (summary) => {

    const tips = [];

    if (summary.totalExpense > summary.totalIncome) {

        tips.push("You are spending more than you earn. Try reducing discretionary expenses.");

    }

    if (summary.totalExpense > summary.totalIncome * 0.7) {

        tips.push("Consider setting a monthly budget to control expenses.");

    }

    if (summary.balance > 0) {

        tips.push("Good job saving money. Consider investing or saving more.");

    }

    return tips;

};



// Auto categorize expenses based on keywords
exports.autoCategorize = (description) => {

    const text = description.toLowerCase();

    if (text.includes("uber") || text.includes("taxi") || text.includes("fuel")) {
        return "transport";
    }

    if (text.includes("pizza") || text.includes("restaurant") || text.includes("food")) {
        return "food";
    }

    if (text.includes("amazon") || text.includes("shopping")) {
        return "shopping";
    }

    if (text.includes("salary")) {
        return "income";
    }

    return "others";
};



// Real-time update message when transaction added
exports.transactionNotification = (transaction) => {

    return `New ${transaction.type} recorded: ₹${transaction.amount} in category ${transaction.category}`;

};