const fs = require('fs');
const path = require('path');

const directory = './frontend';

const fixOpacities = (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        fixOpacities(fullPath);
      }
    } else {
      if (['.tsx', '.ts', '.js', '.jsx'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = content;
        
        // Revert text gradients that have an opacity modifier to solid colors with the opacity modifier
        updated = updated.replace(/text-gradient-primary\/(\d+)/g, 'text-[#004A8F]/$1');
        updated = updated.replace(/text-gradient-secondary\/(\d+)/g, 'text-[#EF7A08]/$1');
        
        // Let's also check if there are any other text-gradient classes on small texts that we should revert
        // In FAQSection, it makes sense for the answer text to just be gray, but text-[#EF7A08]/80 is fine too.
        
        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Fixed opacities in ${fullPath}`);
        }
      }
    }
  }
};

fixOpacities(directory);
console.log('Opacity fix complete.');
