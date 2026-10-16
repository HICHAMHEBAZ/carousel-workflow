// Export slides -> PNG (1080x1350 @2x) + one PDF. Optional webm preview.
// Usage: node export.mjs [--video]
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const ROOT = resolve(".");
const OUT = join(ROOT, "out");
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2" };

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = resolve(join(ROOT, path === "/" ? "index.html" : path));
    if (file !== ROOT && !file.startsWith(ROOT + sep)) throw new Error("outside root");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch (err) {
    res.writeHead(404).end(String(err.message));
  }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}`;

// Prefer an installed browser so no download is needed; fall back to Playwright's bundled Chromium.
async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try { return await chromium.launch({ channel }); } catch { /* try next */ }
  }
  return chromium.launch();
}

await mkdir(OUT, { recursive: true });
const browser = await launch();

try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await page.goto(`${base}/?export=1`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const slides = await page.$$(".slide");
  if (slides.length === 0) throw new Error("no slides rendered; check js/content.js for errors");
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: join(OUT, `slide-${String(i + 1).padStart(2, "0")}.png`) });
  }
  const pdfPath = join(OUT, "carousel.pdf");
  await page.pdf({ path: pdfPath, width: "1080px", height: "1350px", printBackground: true });
  const pdf = (await readFile(pdfPath)).toString("latin1");
  const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`exported ${slides.length} slides, PDF pages: ${pages} -> out/`);
  if (pages !== slides.length) {
    console.error(`WARNING: PDF has ${pages} pages but there are ${slides.length} slides`);
    process.exitCode = 1;
  }

  if (process.argv.includes("--video")) {
    const ctx = await browser.newContext({ viewport: { width: 1080, height: 1350 }, recordVideo: { dir: OUT, size: { width: 1080, height: 1350 } } });
    const vp = await ctx.newPage();
    await vp.goto(`${base}/`, { waitUntil: "networkidle" });
    await vp.addStyleTag({ content: ".nav{display:none!important} #stage{--scale:1!important}" });
    await vp.evaluate(() => document.fonts.ready);
    for (let i = 0; i < slides.length; i++) {
      await vp.waitForTimeout(2200);
      await vp.click("#next");
    }
    await ctx.close();
    await writeFile(join(OUT, "VIDEO_README.txt"), "The newest .webm in this folder is the motion preview.\n");
    console.log("motion preview saved (webm) -> out/");
  }
} finally {
  await browser.close();
  server.close();
}
