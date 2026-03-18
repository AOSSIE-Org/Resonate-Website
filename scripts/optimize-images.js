/**
 * Image Optimization Script
 * 
 * Uses Sharp to compress images (PNG, JPG, JPEG, WebP) and generate WebP versions.
 * Automatically discovers all supported files in the assets directory.
 * Run with: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'app', 'assets');
const PNG_QUALITY = 80;
const JPG_QUALITY = 80;
const WEBP_QUALITY = 80;
const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

// Minimum file size to optimize (skip small icons/logos under 5KB)
const MIN_FILE_SIZE = 5 * 1024;

/**
 * Dynamically find all supported images in the assets directory
 */
async function findImages() {
    try {
        const files = await fs.promises.readdir(ASSETS_DIR);
        const images = [];

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (SUPPORTED_EXTENSIONS.includes(ext)) {
                const filePath = path.join(ASSETS_DIR, file);
                const stats = await fs.promises.stat(filePath);

                // Only include files above minimum size threshold
                if (stats.size >= MIN_FILE_SIZE) {
                    images.push(file);
                }
            }
        }

        return images;
    } catch (error) {
        console.error('Error reading assets directory:', error.message);
        return [];
    }
}

async function getFileSize(filePath) {
    try {
        const stats = await fs.promises.stat(filePath);
        return stats.size;
    } catch (error) {
        // File doesn't exist or is inaccessible
        return 0;
    }
}

async function fileExists(filePath) {
    try {
        await fs.promises.access(filePath, fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function optimizeImage(filename) {
    const inputPath = path.join(ASSETS_DIR, filename);
    const ext = path.extname(filename).toLowerCase();
    const tempPath = path.join(ASSETS_DIR, `temp_${filename}`);
    const webpPath = path.join(ASSETS_DIR, filename.replace(ext, '.webp'));

    // Check if file exists
    if (!await fileExists(inputPath)) {
        console.log(`Skipping ${filename} - file not found`);
        return null;
    }

    const originalSize = await getFileSize(inputPath);

    try {
        // Prepare optimization pipeline
        let pipeline = sharp(inputPath);
        
        if (ext === '.png') {
            pipeline = pipeline.png({
                quality: PNG_QUALITY,
                compressionLevel: 9
            });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({
                quality: JPG_QUALITY,
                mozjpeg: true
            });
        } else if (ext === '.webp') {
            pipeline = pipeline.webp({
                quality: WEBP_QUALITY
            });
        }

        await pipeline.toFile(tempPath);

        const tempSize = await getFileSize(tempPath);

        // Only replace original if compressed version is smaller
        let compressedSize;
        if (tempSize < originalSize) {
            // Atomically replace original with compressed version
            await fs.promises.rename(tempPath, inputPath);
            compressedSize = tempSize;
        } else {
            // Keep original, remove temp file
            await fs.promises.unlink(tempPath);
            compressedSize = originalSize;
            process.stdout.write(`(already optimized) `);
        }

        // Generate WebP version (skip if input is already webp)
        let webpSize = 0;
        if (ext !== '.webp') {
            await sharp(inputPath)
                .webp({ quality: WEBP_QUALITY })
                .toFile(webpPath);
            webpSize = await getFileSize(webpPath);
        } else {
            webpSize = compressedSize;
        }

        return {
            filename,
            originalSize,
            compressedSize,
            webpSize,
            savings: originalSize - compressedSize,
            savingsPercent: originalSize > 0
                ? ((originalSize - compressedSize) / originalSize * 100).toFixed(1)
                : '0.0'
        };
    } catch (error) {
        console.error(`Error optimizing ${filename}:`, error.message);
        // Clean up temp file if it exists
        if (await fileExists(tempPath)) {
            await fs.promises.unlink(tempPath);
        }
        return null;
    }
}

async function main() {
    console.log('\nImage Optimization Script\n');
    console.log('='.repeat(60));

    // Dynamically find all supported images in assets directory
    const imagesToOptimize = await findImages();

    if (imagesToOptimize.length === 0) {
        console.log('No supported images found to optimize.\n');
        return;
    }

    console.log(`Found ${imagesToOptimize.length} images to optimize.\n`);

    const results = [];
    let totalOriginal = 0;
    let totalCompressed = 0;

    for (const filename of imagesToOptimize) {
        process.stdout.write(`Processing ${filename}... `);
        const result = await optimizeImage(filename);

        if (result) {
            results.push(result);
            totalOriginal += result.originalSize;
            totalCompressed += result.compressedSize;
            console.log(`Done - Saved ${result.savingsPercent}%`);
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\nOptimization Results:\n');
    console.log('| Image | Original | Compressed | WebP | Savings |');
    console.log('|-------|----------|------------|------|---------|');

    for (const r of results) {
        console.log(`| ${r.filename.substring(0, 20).padEnd(20)} | ${formatBytes(r.originalSize).padEnd(8)} | ${formatBytes(r.compressedSize).padEnd(10)} | ${formatBytes(r.webpSize).padEnd(6)} | ${r.savingsPercent}% |`);
    }

    console.log('\n' + '='.repeat(60));

    // Prevent division by zero if no images were processed
    if (totalOriginal === 0) {
        console.log('\nNo images were processed.\n');
        return;
    }

    console.log(`\nTotal: ${formatBytes(totalOriginal)} -> ${formatBytes(totalCompressed)}`);
    console.log(`Saved: ${formatBytes(totalOriginal - totalCompressed)} (${((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)}%)\n`);
}

main().catch(console.error);
