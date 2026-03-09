// -------- USER VALIDATION --------
exports.validateUser = (req, res, next) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: "Name and email are required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Invalid email format"
        });
    }

    next();
};



// -------- TRANSACTION VALIDATION --------
exports.validateTransaction = (req, res, next) => {

    const { type, amount, category, date } = req.body;
    const isPost = req.method === "POST";


    if (isPost && (!type || amount === undefined || !category || !date)) {
        return res.status(400).json({
            error: "Transaction must include type, amount, category and date"
        });
    }

    if (type !== undefined && type !== "income" && type !== "expense") {
        return res.status(400).json({
            error: "Type must be income or expense"
        });
    }

    if (amount !== undefined) {

        const numAmount = Number(amount);

        if (isNaN(numAmount) || numAmount <= 0) {
            return res.status(400).json({
                error: "Amount must be a positive number"
            });
        }

    }

    if (date !== undefined) {

        if (isNaN(Date.parse(date))) {
            return res.status(400).json({
                error: "Invalid Date format. Use YYYY-MM-DD"
            });
        }

        if (new Date(date) > new Date()) {
            return res.status(400).json({
                error: "Transaction date cannot be in the future"
            });
        }

    }

    next();
};