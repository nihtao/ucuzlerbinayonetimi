const translate = require('translate-google');
const fs = require('fs');

const dataStr = fs.readFileSync('utils/blogData.ts', 'utf8');
let content = dataStr.replace('export const blogYazilari = ', '');
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
  for (let j = 0; j < targetLangs.length; j++) {
    const targetLang = targetLangs[j];
    const prefix = langKeys[j];
    console.log(`Translating to ${targetLang}...`);
    
    // Group all basliks, ozets, etikets, detayli_iceriks
    const basliks = blogYazilari.map(i => i.en_baslik);
    const ozets = blogYazilari.map(i => i.en_ozet);
    const etikets = blogYazilari.map(i => i.en_etiket);
    const detaylis = blogYazilari.map(i => i.en_detayli_icerik);

    try {
      const transBasliks = await translate(basliks, {to: targetLang});
      const transOzets = await translate(ozets, {to: targetLang});
      const transEtikets = await translate(etikets, {to: targetLang});
      
      // detayli_iceriks are HTML, translate-google might fail if we pass them as a huge array, let's translate them individually
      console.log(`  Translated fields for ${targetLang}. Now translating HTML content...`);
      for (let i = 0; i < blogYazilari.length; i++) {
        blogYazilari[i][`${prefix}_baslik`] = transBasliks[i];
        blogYazilari[i][`${prefix}_ozet`] = transOzets[i];
        blogYazilari[i][`${prefix}_etiket`] = transEtikets[i];
        
        // Translate HTML chunk
        const transDetayli = await translate(blogYazilari[i].en_detayli_icerik, {to: targetLang});
        blogYazilari[i][`${prefix}_detayli_icerik`] = transDetayli;
      }
    } catch (err) {
      console.error(`Error translating to ${targetLang}`, err);
    }
  }

  let newContent = 'export const blogYazilari = ' + JSON.stringify(blogYazilari, null, 2) + ';\n';
  fs.writeFileSync('utils/blogData.ts', newContent, 'utf8');
  console.log('Done translating and saving utils/blogData.ts');
}

processTranslations();
