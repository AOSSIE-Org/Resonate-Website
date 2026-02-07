const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../app/assets');
const outputDir = path.join(__dirname, '../public/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const optimizeImage = async (file) => {
  const inputPath = path.join(inputDir, file);
  const ext = path.extname(file).toLowerCase();
  
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const outputPath = path.join(outputDir, file.replace(ext, '.webp'));
  
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);
  
  console.log(`✓ Optimized: ${file}`);
};

fs.readdir(inputDir, async (err, files) => {
  if (err) throw err;
  
  for (const file of files) {
    await optimizeImage(file);
  }
  
  console.log('\n✓ All images optimized!');
});
