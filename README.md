# Static Site for SEC Data

This is a simple static site hosted on GitHub Pages that fetches and displays data from the SEC's EDGAR database.

## Features

*   Fetches data from the SEC API.
*   Uses a proxy (AIPipe) to bypass CORS issues.
*   Includes a fallback mechanism to handle data loading failures.
*   Displays the entity name, max and min share values, and corresponding fiscal years.
*   Dark mode support.

## How to Use

1.  **Deployment:** Deploy this to GitHub Pages.
2.  **Access:** Open the `index.html` file in your browser.
3.  **CIK Parameter:** You can specify a different CIK by adding a `CIK` query parameter to the URL, e.g., `index.html?CIK=0001018724`.

## Proxy

The site uses the AIPipe proxy to bypass CORS restrictions when fetching data from the SEC API.  This is necessary because the SEC API does not allow cross-origin requests directly from a browser.

## Fallback

If the data fetch fails (e.g., due to network issues or API errors), the site will display an error message in the `#status` element.

## Files

*   `index.html`: The main HTML file.
*   `script.js`: The JavaScript file that fetches and processes the data.
*   `styles.css`: The CSS file for styling.
*   `README.md`: This file.

## User-Agent

The script sets a `User-Agent` header in the fetch request to comply with the SEC's guidelines.  Please replace `your.email@example.com` with your actual email address in `script.js`.