import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "public", "galerija");
const outputDir = path.join(sourceDir, "optimized");
const generatedDir = path.join(rootDir, "src", "generated");
const generatedFile = path.join(generatedDir, "gallery-images.ts");

const targetWidths = [480, 900, 1400];
const allowedExtensions = new Set([".jpg", ".jpeg", ".png"]);
const aspectRatios = [
  { label: "16 / 9", value: 16 / 9 },
  { label: "1 / 1", value: 1 },
  { label: "3 / 4", value: 3 / 4 },
];

function toPublicPath(filePath) {
  return filePath.replace(rootDir, "").replaceAll("\\", "/");
}

function toSlug(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/\s+-\s+Copy(?:\s*\(\d+\))?$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function toTitle(index) {
  return `Galerija ${index + 1}`;
}

function pickAspectRatio(width, height) {
  const value = width / height;

  return aspectRatios.reduce((closest, current) => {
    const currentDiff = Math.abs(current.value - value);
    const closestDiff = Math.abs(closest.value - value);
    return currentDiff < closestDiff ? current : closest;
  }).label;
}

function uniqueSortedWidths(originalWidth) {
  const widths = targetWidths.filter((width) => width < originalWidth);
  widths.push(Math.min(originalWidth, targetWidths[targetWidths.length - 1]));
  return [...new Set(widths)].sort((a, b) => a - b);
}

async function ensureCleanOutputDir() {
  await fs.rm(outputDir, { recursive: true, force: true });
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(generatedDir, { recursive: true });
}

async function optimizeImage(fileName) {
  const inputPath = path.join(sourceDir, fileName);
  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Missing dimensions for ${fileName}`);
  }

  const slug = toSlug(fileName);
  const widths = uniqueSortedWidths(metadata.width);
  const jpegSrcSet = [];
  const webpSrcSet = [];

  for (const width of widths) {
    const jpgName = `${slug}-${width}.jpg`;
    const webpName = `${slug}-${width}.webp`;
    const jpgOutput = path.join(outputDir, jpgName);
    const webpOutput = path.join(outputDir, webpName);

    await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(jpgOutput);

    await image
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 68, effort: 6 })
      .toFile(webpOutput);

    jpegSrcSet.push(`${toPublicPath(jpgOutput)} ${width}w`);
    webpSrcSet.push(`${toPublicPath(webpOutput)} ${width}w`);
  }

  const largestWidth = widths[widths.length - 1];

  return {
    src: `/galerija/optimized/${slug}-${largestWidth}.jpg`,
    srcSet: jpegSrcSet.map((entry) => entry.replace("/public", "")).join(", "),
    webpSrcSet: webpSrcSet.map((entry) => entry.replace("/public", "")).join(", "),
    width: metadata.width,
    height: metadata.height,
    aspectRatio: pickAspectRatio(metadata.width, metadata.height),
  };
}

async function main() {
  const files = await fs.readdir(sourceDir);
  const inputFiles = files
    .filter((fileName) => {
      const extension = path.extname(fileName).toLowerCase();
      return allowedExtensions.has(extension) && !fileName.includes(" - Copy");
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  await ensureCleanOutputDir();

  const items = [];

  for (const [index, fileName] of inputFiles.entries()) {
    const optimized = await optimizeImage(fileName);

    items.push({
      id: `${index + 1}`,
      title: toTitle(index),
      category: "projekti",
      image: optimized,
      aspectRatio: optimized.aspectRatio,
    });
  }

  const fileContent = `export const GENERATED_GALLERY_ITEMS = ${JSON.stringify(items, null, 2)} as const;\n`;
  await fs.writeFile(generatedFile, fileContent, "utf8");

  const summary = await Promise.all(
    inputFiles.map(async (fileName) => {
      const originalStat = await fs.stat(path.join(sourceDir, fileName));
      const slug = toSlug(fileName);
      const optimizedFiles = await fs.readdir(outputDir);
      const relatedFiles = optimizedFiles.filter((name) => name.startsWith(`${slug}-`));
      const relatedStats = await Promise.all(
        relatedFiles.map((name) => fs.stat(path.join(outputDir, name))),
      );

      const optimizedBytes = relatedStats.reduce((total, stat) => total + stat.size, 0);

      return {
        fileName,
        originalBytes: originalStat.size,
        optimizedBytes,
      };
    }),
  );

  const totalOriginal = summary.reduce((total, item) => total + item.originalBytes, 0);
  const totalOptimized = summary.reduce((total, item) => total + item.optimizedBytes, 0);

  console.log(
    `Optimized ${items.length} gallery images: ${Math.round(totalOriginal / 1024)}KB -> ${Math.round(totalOptimized / 1024)}KB`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
