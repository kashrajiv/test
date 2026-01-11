const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrapes content from a given URL
 * @param {string} url - The URL to scrape
 * @returns {Promise<Object>} Object containing title, content, and URL
 */
async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    $('script').remove();
    $('style').remove();
    $('noscript').remove();

    const title = $('title').text().trim() || 'No Title';
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();

    return {
      success: true,
      url,
      title,
      content: textContent
    };
  } catch (error) {
    return {
      success: false,
      url,
      error: error.message
    };
  }
}

/**
 * Scrapes multiple websites sequentially
 * @param {Array<string>} urls - Array of URLs to scrape
 * @returns {Promise<Array>} Array of scraping results
 */
async function scrapeMultipleWebsites(urls) {
  const results = [];

  for (const url of urls) {
    const result = await scrapeWebsite(url.trim());
    results.push(result);
  }

  return results;
}

module.exports = {
  scrapeWebsite,
  scrapeMultipleWebsites
};
