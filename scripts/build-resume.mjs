// Renders /en/resume and /es/resume to PDF into public/resume.
// Usage: npm run build && npm run start (in another terminal), then npm run resume:pdf
// Needs a local Chromium: set CHROMIUM_PATH, or install Chrome and let playwright-core find it.
import { chromium } from "playwright-core";

const base = process.env.RESUME_BASE_URL ?? "http://localhost:3000";
const targets = [
  { path: "/en/resume", out: "public/resume/ludwing-valdes-reyes-resume-en.pdf" },
  { path: "/es/resume", out: "public/resume/ludwing-valdes-reyes-cv-es.pdf" },
];

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : { channel: "chrome" },
);
const page = await browser.newPage();
for (const t of targets) {
  await page.goto(base + t.path, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: t.out, format: "Letter", printBackground: true, preferCSSPageSize: true });
  console.log("wrote", t.out);
}
await browser.close();
