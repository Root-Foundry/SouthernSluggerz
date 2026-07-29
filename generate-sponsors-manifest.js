// Scans pictures/Sponsors/<Tier> folders and writes a manifest.json listing
// each tier's sponsor logos, in tier priority order (highest tier first).
// Runs automatically before each `firebase deploy` (see firebase.json "predeploy").
// To add a sponsor: drop their logo into pictures/Sponsors/<Tier>/ - no code changes needed.
// Tiers with no logos yet are simply omitted from the manifest.
const fs = require('fs');
const path = require('path');

const sponsorsDir = path.join(__dirname, 'pictures', 'Sponsors');
const manifestPath = path.join(sponsorsDir, 'manifest.json');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const tiers = ['MVP', 'All-Star', 'Team'];

const manifest = tiers
    .map(tier => {
        const tierDir = path.join(sponsorsDir, tier);
        if (!fs.existsSync(tierDir)) return { tier, files: [] };

        const files = fs.readdirSync(tierDir)
            .filter(file => imageExtensions.has(path.extname(file).toLowerCase()))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

        return { tier, files };
    })
    .filter(entry => entry.files.length > 0);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

const total = manifest.reduce((sum, entry) => sum + entry.files.length, 0);
console.log(`Sponsors manifest updated: ${total} sponsor logo(s) across ${manifest.length} tier(s)`);
