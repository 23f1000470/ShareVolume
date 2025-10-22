const CIK = new URLSearchParams(window.location.search).get('CIK') || '0000014272';
const API_URL = `https://data.sec.gov/api/xbrl/companyconcept/CIK${CIK}/dei/EntityCommonStockSharesOutstanding.json`;
const PROXY_URL = (url) => url && url.startsWith('http') ? `https://aipipe.org/proxy/${encodeURIComponent(url)}` : url;
const USER_AGENT = 'MyStaticSite/1.0 (your.email@example.com)'; // Replace with your email

const status = document.getElementById('status');
const entityNameEl = document.getElementById('entity-name');
const shareEntityNameEl = document.getElementById('share-entity-name');
const shareMaxValueEl = document.getElementById('share-max-value');
const shareMaxFyEl = document.getElementById('share-max-fy');
const shareMinValueEl = document.getElementById('share-min-value');
const shareMinFyEl = document.getElementById('share-min-fy');

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': USER_AGENT
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        status.textContent = `Error fetching data: ${error.message}`;
        return null;
    }
}

async function processData() {
    status.textContent = 'Loading data...';
    const data = await fetchData(PROXY_URL(API_URL));

    if (!data) {
        status.textContent = 'Failed to load data.  Using fallback.';
        return;
    }

    const entityName = data.entityName;
    const shares = data.units.shares.filter(s => parseInt(s.fy) > 2020 && typeof s.val === 'number');

    if (!shares || shares.length === 0) {
        status.textContent = 'No share data found after filtering.';
        return;
    }

    const maxShare = shares.reduce((max, current) => (current.val > max.val ? current : max), shares[0]);
    const minShare = shares.reduce((min, current) => (current.val < min.val ? current : min), shares[0]);

    entityNameEl.textContent = `${entityName} - Shares Outstanding`;
    shareEntityNameEl.textContent = entityName;
    shareMaxValueEl.textContent = maxShare.val;
    shareMaxFyEl.textContent = maxShare.fy;
    shareMinValueEl.textContent = minShare.val;
    shareMinFyEl.textContent = minShare.fy;

    status.textContent = 'Data loaded successfully.';
}

processData();