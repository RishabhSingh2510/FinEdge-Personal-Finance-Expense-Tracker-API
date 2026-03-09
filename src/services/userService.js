const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");

exports.createUser = async (data) => {

    const users = await userModel.getUsers();

    const existingUser = users.find(
        u => u.email.toLowerCase() === data.email.toLowerCase()
    );

    if(existingUser){
        throw new AppError("User with this email already exists", 409);
    }
    
    return userModel.saveUser(data);
};