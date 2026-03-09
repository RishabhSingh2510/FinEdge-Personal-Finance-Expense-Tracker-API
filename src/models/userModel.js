const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

const FILE = "./src/data/users.json";

async function readUsers() {
    try {
        const data = await fs.readFile(FILE, "utf8");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

exports.getUsers = async () => {
    return readUsers();
};

exports.saveUser = async (user) => {

    const users = await readUsers();

    const newUser = {
        id: uuid(),
        ...user
    };

    users.push(newUser);

    await fs.writeFile(FILE, JSON.stringify(users, null, 2));

    return newUser;
};