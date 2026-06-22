import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sitemapPath = path.join(root, "sitemap.xml");
const keyFileName = "59bbc7ad7158a49c8847cee661715aa9.txt";
const keyFilePath = path.join(root, keyFileName);
const host = "ai6638.com";
const endpoint = "https://api.indexnow.org/indexnow";

function extractUrlsFromSitemap(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function normalizeInputUrl(value) {
  if (!value) return null;
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }
  return `https://${host}${value.startsWith("/") ? value : `/${value}`}`;
}

const key = (await readFile(keyFilePath, "utf8")).trim();
const cliUrls = process.argv.slice(2).map(normalizeInputUrl).filter(Boolean);
const sitemapXml = await readFile(sitemapPath, "utf8");
const sitemapUrls = extractUrlsFromSitemap(sitemapXml);
const urlList = [...new Set(cliUrls.length ? cliUrls : sitemapUrls)];

if (!urlList.length) {
  console.error("No URLs found to submit.");
  process.exit(1);
}

const body = {
  host,
  key,
  keyLocation: `https://${host}/${keyFileName}`,
  urlList
};

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: JSON.stringify(body)
});

const text = await response.text();

console.log(`Submitted ${urlList.length} URLs to IndexNow.`);
console.log(`Status: ${response.status} ${response.statusText}`);
if (text) {
  console.log(text);
}

if (!response.ok) {
  process.exit(1);
}
