const fs = require('fs').promises;
const path = require('path');

const dataPath = (file) =>
  path.join(process.cwd(), 'public', 'data-base', file);

const readData = async (file) => {
  try {
    const content = await fs.readFile(dataPath(file), 'utf-8');

    return JSON.parse(content);
  } catch (err) {
    return [];
  }
};

const writeData = async (file, data) => {
  await fs.writeFile(dataPath(file), JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
