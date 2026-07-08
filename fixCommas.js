const fs = require('fs');
let content = fs.readFileSync('utils/blogData.ts', 'utf8');
content = content.replace(/tarih: "08\.07\.2026"\r?\n\s*en_baslik/g, 'tarih: "08.07.2026",\n    en_baslik');
fs.writeFileSync('utils/blogData.ts', content, 'utf8');
console.log('Fixed commas');
