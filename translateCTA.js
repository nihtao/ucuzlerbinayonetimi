const translate = require('translate-google');
const fs = require('fs');

const langs = ['ar', 'es', 'fr', 'zh-cn', 'de'];
const keys = ['ar', 'es', 'fr', 'zh', 'de'];

const source = {
  backToAll: 'Back to All News',
  ctaTitle: 'Need More Information?',
  ctaDesc: 'You can get professional support for all legal processes, technical problems, and accounting procedures related to your building management.',
  ctaBtn: 'Contact Us Now'
};

async function run() {
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    const key = keys[i];
    
    try {
      console.log(`Translating for ${key}...`);
      const transBackToAll = await translate(source.backToAll, {to: lang});
      const transCtaTitle = await translate(source.ctaTitle, {to: lang});
      const transCtaDesc = await translate(source.ctaDesc, {to: lang});
      const transCtaBtn = await translate(source.ctaBtn, {to: lang});
      
      const path = `locales/${key}/common.json`;
      if (fs.existsSync(path)) {
        let data = JSON.parse(fs.readFileSync(path, 'utf8'));
        data.blogDetail = {
          backToAll: transBackToAll,
          ctaTitle: transCtaTitle,
          ctaDesc: transCtaDesc,
          ctaBtn: transCtaBtn
        };
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
      }
    } catch(e) {
      console.error(e);
    }
  }
  console.log("Done");
}

run();
