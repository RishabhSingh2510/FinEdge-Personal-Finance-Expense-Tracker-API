exports.calculateSummary = (transactions) => {

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {

        if (t.type === "income") {
            income += Number(t.amount);
        }

        if (t.type === "expense") {
            expense += Number(t.amount);
        }

    });

    return {
        totalIncome: income,
        totalExpense: expense,
        balance: income - expense
    };
};



// Filter transactions by category
exports.filterByCategory = (transactions, category) => {

    return transactions.filter(t => t.category === category);

};



// Filter transactions by date range
exports.filterByDate = (transactions, startDate, endDate) => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    return transactions.filter(t => {

        const txDate = new Date(t.date);

        return txDate >= start && txDate <= end;

    });
};



// Monthly trends
exports.monthlyTrends = (transactions) => {

    const trends = {};

    transactions.forEach(t => {

        const month = new Date(t.date).toISOString().slice(0,7); 
        // example: 2026-03

        if (!trends[month]) {
            trends[month] = {
                income: 0,
                expense: 0
            };
        }

        if (t.type === "income") {
            trends[month].income += Number(t.amount);
        }

        if (t.type === "expense") {
            trends[month].expense += Number(t.amount);
        }

    });

    return trends;
};