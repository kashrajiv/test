const fs = require('fs').promises;
const path = require('path');

/**
 * Reads URLs from a text file
 * @param {string} filePath - Path to the file containing URLs
 * @returns {Promise<Array<string>>} Array of URLs
 */
async function readUrlsFromFile(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.readFile(absolutePath, 'utf-8');

    const urls = fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && line.startsWith('http'));

    return urls;
  } catch (error) {
    throw new Error(`Failed to read file: ${error.message}`);
  }
}

module.exports = {
  readUrlsFromFile
};
