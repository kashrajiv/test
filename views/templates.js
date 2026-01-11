/**
 * Generates the home page HTML
 * @returns {string} HTML content
 */
function getHomePage() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Web Scraper</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          max-width: 800px;
          margin: 40px auto;
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        h1 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
        h2 {
          color: #667eea;
          margin-top: 30px;
          margin-bottom: 15px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          color: #333;
          font-weight: bold;
          margin-bottom: 8px;
        }
        input[type="text"] {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
          box-sizing: border-box;
        }
        input[type="text"]:focus {
          outline: none;
          border-color: #667eea;
        }
        button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s;
        }
        button:hover {
          transform: translateY(-2px);
        }
        .divider {
          margin: 30px 0;
          border-top: 2px solid #eee;
        }
        .info-text {
          color: #666;
          font-size: 14px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Web Scraper</h1>

        <h2>Single Website Scraping</h2>
        <form method="POST" action="/scrape">
          <div class="form-group">
            <label for="url">Enter Website URL:</label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder="https://example.com"
              required
            />
          </div>
          <button type="submit">Scrape Website</button>
        </form>

        <div class="divider"></div>

        <h2>Batch Scraping from File</h2>
        <form method="POST" action="/scrape-batch">
          <div class="info-text">
            This will scrape all websites listed in webpages.txt
          </div>
          <div class="form-group" style="margin-top: 15px;">
            <button type="submit">Scrape All Websites from File</button>
          </div>
        </form>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates the single scrape result page
 * @param {Object} result - Scraping result
 * @returns {string} HTML content
 */
function getSingleResultPage(result) {
  if (!result.success) {
    return getErrorPage(result.url, result.error);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Scraped Content</title>
      <style>
        ${getCommonStyles()}
        .content {
          margin-top: 20px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 5px;
          max-height: 600px;
          overflow-y: auto;
          line-height: 1.6;
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="back-link">← Back to Scraper</a>
        <h1>Scraped Content</h1>
        <div class="url-info">
          <strong>URL:</strong> ${result.url}
        </div>
        <div class="page-title">Website Name: ${result.title}</div>
        <div class="content">
          ${result.content}
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates the batch scrape result page
 * @param {Array} results - Array of scraping results
 * @returns {string} HTML content
 */
function getBatchResultPage(results) {
  const resultsHtml = results.map(result => {
    if (result.success) {
      return `
        <div class="result-item">
          <div class="website-name">Website Name: ${result.title}</div>
          <div class="website-url">${result.url}</div>
          <div class="website-content">
            ${result.content.substring(0, 1000)}${result.content.length > 1000 ? '...' : ''}
          </div>
        </div>
      `;
    } else {
      return `
        <div class="result-item error-item">
          <div class="website-name">Website Name: Error</div>
          <div class="website-url">${result.url}</div>
          <div class="error-message">
            <strong>Error:</strong> ${result.error}
          </div>
        </div>
      `;
    }
  }).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Batch Scraping Results</title>
      <style>
        ${getCommonStyles()}
        .result-item {
          margin-bottom: 30px;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        .error-item {
          border-left-color: #e74c3c;
          background: #fadbd8;
        }
        .website-name {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }
        .website-url {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
          word-break: break-all;
        }
        .website-content {
          color: #444;
          line-height: 1.6;
          white-space: pre-wrap;
          max-height: 300px;
          overflow-y: auto;
          padding: 15px;
          background: white;
          border-radius: 5px;
        }
        .error-message {
          color: #e74c3c;
          padding: 10px;
          background: white;
          border-radius: 5px;
        }
        .summary {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #2e7d32;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="back-link">← Back to Scraper</a>
        <h1>Batch Scraping Results</h1>
        <div class="summary">
          Total websites scraped: ${results.length} |
          Successful: ${results.filter(r => r.success).length} |
          Failed: ${results.filter(r => !r.success).length}
        </div>
        ${resultsHtml}
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates error page HTML
 * @param {string} url - The URL that failed
 * @param {string} errorMessage - Error message
 * @returns {string} HTML content
 */
function getErrorPage(url, errorMessage) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Error</title>
      <style>
        ${getCommonStyles()}
        h1 {
          color: #e74c3c;
        }
        .error {
          color: #e74c3c;
          padding: 15px;
          background: #fadbd8;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="/" class="back-link">← Back to Scraper</a>
        <h1>Error Scraping Website</h1>
        ${url ? `<div class="url-info"><strong>URL:</strong> ${url}</div>` : ''}
        <div class="error">
          <strong>Error:</strong> ${errorMessage}
          <br><br>
          Please make sure the URL is valid and the website is accessible.
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Returns common CSS styles
 * @returns {string} CSS styles
 */
function getCommonStyles() {
  return `
    body {
      font-family: Arial, sans-serif;
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .container {
      max-width: 900px;
      margin: 40px auto;
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
      text-align: center;
    }
    .back-link {
      display: inline-block;
      margin-bottom: 20px;
      color: #667eea;
      text-decoration: none;
      font-weight: bold;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .url-info {
      background: #f0f0f0;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      word-break: break-all;
    }
    .url-info strong {
      color: #333;
    }
    .page-title {
      font-size: 20px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 15px;
    }
  `;
}

module.exports = {
  getHomePage,
  getSingleResultPage,
  getBatchResultPage,
  getErrorPage
};
