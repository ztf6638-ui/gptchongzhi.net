import { cp, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "dist");

const files = [
  "robots.txt",
  "sitemap.xml",
  "rss.xml",
  "site.webmanifest",
  "favicon.ico",
  "favicon-96x96.png",
  "apple-touch-icon.png",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
  "google0f47ddb4e138ff96.html",
  "59bbc7ad7158a49c8847cee661715aa9.txt"
];

const dirs = ["images", "index_files", "scripts", "styles"];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

for (const entry of await readdir(root)) {
  if (entry.endsWith(".html")) {
    files.push(entry);
  }
}

for (const file of files) {
  await cp(path.join(root, file), path.join(outDir, file), { recursive: true });
}

for (const dir of dirs) {
  await cp(path.join(root, dir), path.join(outDir, dir), { recursive: true });
}

console.log(`Copied ${files.length} files and ${dirs.length} directories to dist/`);
