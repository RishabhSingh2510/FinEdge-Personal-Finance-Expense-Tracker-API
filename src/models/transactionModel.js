const fs = require("fs/promises");
const { v4: uuid } = require("uuid");

const FILE = "./src/data/transactions.json";

async function readData() {
    try {
        const data = await fs.readFile(FILE, "utf8");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

async function writeData(data) {
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

exports.saveTransaction = async (tx) => {
  const data = await readData();

  const newTx = {
    id: uuid(),
    ...tx
  };

  data.push(newTx);

  await writeData(data);

  return newTx;
};

exports.getAllTransactions = async () => {
  return readData();
};

exports.updateTransaction = async (id, update) => {
  const data = await readData();

  const index = data.findIndex((t) => t.id === id);

  if (index === -1) return null;

  data[index] = { ...data[index], ...update };

  await writeData(data);

  return data[index];
};

exports.deleteTransaction = async (id) => {
  const data = await readData();

  const filtered = data.filter((t) => t.id !== id);

  await writeData(filtered);
};