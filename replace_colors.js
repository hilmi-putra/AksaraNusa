const fs = require('fs');
const path = require('path');

const directory = './frontend';

const replaceColors = (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        replaceColors(fullPath);
      }
    } else {
      if (['.tsx', '.ts', '.js', '.jsx'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = content;
        
        // Replace old primary with new primary
        updated = updated.replace(/#DB8B00/gi, '#004A8F');
        // Replace old secondary with new secondary
        updated = updated.replace(/#6E0000/gi, '#EF7A08');
        // Check if there are other variants (lowercase)
        updated = updated.replace(/#db8b00/g, '#004A8F');
        updated = updated.replace(/#6e0000/g, '#EF7A08');

        // Also replace "Mega Press" with "Aksara Nusa" in text? The user mentioned "copywriting" for later but let's do the obvious ones if needed.
        // Actually, let's stick to colors first.

        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Updated colors in ${fullPath}`);
        }
      }
    }
  }
};

replaceColors(directory);
console.log('Color replacement complete.');
