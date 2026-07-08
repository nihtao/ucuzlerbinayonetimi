const translate = require('translate-google');
const fs = require('fs');

const langs = ['ar', 'es', 'fr', 'zh-cn', 'de'];
const keys = ['ar', 'es', 'fr', 'zh', 'de'];

const source = {
  blogCorner: "KNOWLEDGE CORNER",
  blogTitle1: "INDUSTRY",
  blogTitle2: "NEWS",
  blogDesc: "Useful information about building management, legal rights, and legislation.",
  blogDetail: "Read Details"
};

async function run() {
  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    const key = keys[i];
    
    try {
      console.log(`Translating home blog section for ${key}...`);
      const tCorner = await translate(source.blogCorner, {to: lang});
      const tTitle1 = await translate(source.blogTitle1, {to: lang});
      const tTitle2 = await translate(source.blogTitle2, {to: lang});
      const tDesc = await translate(source.blogDesc, {to: lang});
      const tDetail = await translate(source.blogDetail, {to: lang});
      
      const path = `locales/${key}/common.json`;
      if (fs.existsSync(path)) {
        let data = JSON.parse(fs.readFileSync(path, 'utf8'));
        
        if(!data.home) data.home = {};
        
        data.home.blogCorner = tCorner;
        data.home.blogTitle1 = tTitle1;
        data.home.blogTitle2 = tTitle2;
        data.home.blogDesc = tDesc;
        data.home.blogDetail = tDetail;
        
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
      }
    } catch(e) {
      console.error(e);
    }
  }
  console.log("Done");
}

run();
