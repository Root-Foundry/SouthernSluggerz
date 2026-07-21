// Scans pictures/Gallery and writes a manifest.json listing every image in it.
// Runs automatically before each `firebase deploy` (see firebase.json "predeploy").
// To add a photo to the site gallery: just drop the image file into pictures/Gallery.
const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'pictures', 'Gallery');
const manifestPath = path.join(galleryDir, 'manifest.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const files = fs.readdirSync(galleryDir)
    .filter(file => imageExtensions.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + '\n');

console.log(`Gallery manifest updated: ${files.length} image(s) found in pictures/Gallery`);
