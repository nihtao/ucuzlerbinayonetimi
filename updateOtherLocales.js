const fs = require('fs');
const locales = ['ar', 'es', 'fr', 'zh', 'de'];
const enTranslation = {
  backToAll: 'Back to All News',
  ctaTitle: 'Need More Information?',
  ctaDesc: 'You can get professional support for all legal processes, technical problems, and accounting procedures related to your building management.',
  ctaBtn: 'Contact Us Now'
};

locales.forEach(locale => {
  const path = `locales/${locale}/common.json`;
  if (fs.existsSync(path)) {
    let data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.blogDetail = enTranslation;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Updated ${locale}`);
  }
});
