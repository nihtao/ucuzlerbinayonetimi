const fs = require('fs');
let code = fs.readFileSync('update_translations.js', 'utf8');
// Fix escaping for building's, it's, etc.
code = code.replace(/\\\\'/g, "\\'"); 
fs.writeFileSync('update_translations.js', code);
