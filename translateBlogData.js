const translate = require('translate-google');
const fs = require('fs');

const dataStr = fs.readFileSync('utils/blogData.ts', 'utf8');

// I will extract the JS object by replacing export const blogYazilari = 
let content = dataStr.replace('export const blogYazilari = ', '');
// eval to get the object
let blogYazilari;
try {
  blogYazilari = eval(content);
} catch(e) {
  console.log("Error evaluating", e);
  process.exit(1);
}

const targetLangs = ['ar', 'es', 'fr', 'zh-cn', 'de'];
const langKeys = ['ar', 'es', 'fr', 'zh', 'de'];

async function processTranslations() {
  for (let i = 0; i < blogYazilari.length; i++) {
    const item = blogYazilari[i];
    console.log(`Translating item ${i+1}/${blogYazilari.length}`);
    for (let j = 0; j < targetLangs.length; j++) {
      const targetLang = targetLangs[j];
      const prefix = langKeys[j];
      
      try {
        const transBaslik = await translate(item.en_baslik, {to: targetLang});
        const transOzet = await translate(item.en_ozet, {to: targetLang});
        const transEtiket = await translate(item.en_etiket, {to: targetLang});
        // detayli_icerik contains HTML. translate-google might break it, but we'll try.
        const transDetayli = await translate(item.en_detayli_icerik, {to: targetLang});
        
        item[`${prefix}_baslik`] = transBaslik;
        item[`${prefix}_ozet`] = transOzet;
        item[`${prefix}_etiket`] = transEtiket;
        item[`${prefix}_detayli_icerik`] = transDetayli;
      } catch (err) {
        console.error(`Error translating to ${targetLang}`, err);
      }
    }
  }

  // Rewrite the file
  let newContent = 'export const blogYazilari = ' + JSON.stringify(blogYazilari, null, 2) + ';\n';
  fs.writeFileSync('utils/blogData.ts', newContent, 'utf8');
  console.log('Done translating and saving utils/blogData.ts');
}

processTranslations();
