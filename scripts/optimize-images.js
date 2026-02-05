/**
 * Image Optimization Script
 * 
 * Uses Sharp to compress PNG images and generate WebP versions.
 * Run with: npm run optimize-images
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '..', 'app', 'assets');
const PNG_QUALITY = 80;
const WEBP_QUALITY = 80;

// Images to optimize (large PNG files)
const IMAGES_TO_OPTIMIZE = [
    'resonate_app.png',
    'Vector.png',
    'Group.png',
    'createrooms.png',
    'roomscreen.png',
    'pairchat.png',
    'chatscreen.png',
    'aossie_logo.png',
    'PlayStore.png',
];

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
    const tempPath = path.join(ASSETS_DIR, `temp_${filename}`);
    const webpPath = path.join(ASSETS_DIR, filename.replace('.png', '.webp'));

    // Check if file exists
    if (!await fileExists(inputPath)) {
        console.log(`Skipping ${filename} - file not found`);
        return null;
    }

    const originalSize = await getFileSize(inputPath);

    try {
        // Compress PNG
        await sharp(inputPath)
            .png({
                quality: PNG_QUALITY,
                compressionLevel: 9
            })
            .toFile(tempPath);

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
            console.log(`(already optimized) `);
        }

        // Generate WebP version
        await sharp(inputPath)
            .webp({ quality: WEBP_QUALITY })
            .toFile(webpPath);

        const webpSize = await getFileSize(webpPath);

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

    const results = [];
    let totalOriginal = 0;
    let totalCompressed = 0;

    for (const filename of IMAGES_TO_OPTIMIZE) {
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
