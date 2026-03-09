require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(express.json());
app.use(logger);

app.get("/health", (req,res)=>{
    res.json({status:"Server running"});
});

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}

module.exports = app;