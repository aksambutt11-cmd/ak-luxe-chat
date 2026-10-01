import fs from 'fs';
import path from 'path';

const files = [
  'src/components/market-snapshot.tsx',
  'src/components/bitcoin-field.tsx',
  'src/components/live-crypto-chart.tsx',
  'src/routes/index.tsx',
  'src/styles.css',
  'vite.config.ts'
];

const bundle = {};
for (const file of files) {
  const fullPath = path.resolve('/app/applet', file);
  try {
    bundle[file] = fs.readFileSync(fullPath, 'utf-8');
  } catch (e) {
    console.error('Error reading', fullPath, e);
  }
}

const publicDir = path.resolve('/app/applet/public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.resolve(publicDir, 'updated_bundle.json'), JSON.stringify(bundle, null, 2));
console.log('Bundle created successfully at public/updated_bundle.json');
