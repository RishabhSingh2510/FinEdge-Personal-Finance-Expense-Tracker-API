const userService = require("../services/userService");

exports.createUser = async (req,res,next) => {
    try{
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch(err) {
        next(err);
    }
};