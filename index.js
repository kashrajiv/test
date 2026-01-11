const express = require('express');
const { scrapeWebsite, scrapeMultipleWebsites } = require('./utils/scraper');
const { readUrlsFromFile } = require('./utils/fileReader');
const {
  getHomePage,
  getSingleResultPage,
  getBatchResultPage,
  getErrorPage
} = require('./views/templates');

const app = express();
const PORT = 3000;
const WEBPAGES_FILE = './webpages.txt';

app.use(express.urlencoded({ extended: true }));

/**
 * Home page route
 */
app.get('/', (req, res) => {
  res.send(getHomePage());
});

/**
 * Single website scraping route
 */
app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.send(getErrorPage(null, 'URL is required'));
  }

  const result = await scrapeWebsite(url);
  res.send(getSingleResultPage(result));
});

/**
 * Batch scraping route - scrapes all URLs from webpages.txt
 */
app.post('/scrape-batch', async (req, res) => {
  try {
    const urls = await readUrlsFromFile(WEBPAGES_FILE);

    if (urls.length === 0) {
      return res.send(getErrorPage(null, 'No valid URLs found in webpages.txt'));
    }

    const results = await scrapeMultipleWebsites(urls);
    res.send(getBatchResultPage(results));
  } catch (error) {
    res.send(getErrorPage(null, error.message));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
