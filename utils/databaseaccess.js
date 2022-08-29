const fs = require("fs/promises");
const path = require("path");

const readDb = async () => {
  return JSON.parse(
    await fs.readFile(path.resolve(__dirname, "../db/db.json"), "utf-8")
  );
};

const writeDb = async (data) => {
  try {
    const stringifiedData = JSON.stringify(data, null, "\t");
    await fs.writeFile(
      path.resolve(__dirname, "../db/db.json"),
      stringifiedData,
      {
        encoding: "utf-8",
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// console.log(readDb);

module.exports = {
  readDb,
  writeDb,
};
