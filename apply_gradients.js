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
        
        // Backgrounds
        updated = updated.replace(/bg-\[\#004A8F\]/g, 'bg-gradient-primary');
        updated = updated.replace(/bg-\[\#EF7A08\]/g, 'bg-gradient-secondary');
        
        // Text
        // Only replace text colors with gradient if they are in className
        updated = updated.replace(/text-\[\#004A8F\]/g, 'text-gradient-primary');
        updated = updated.replace(/text-\[\#EF7A08\]/g, 'text-gradient-secondary');

        // Hover Backgrounds (often used in buttons)
        updated = updated.replace(/hover:bg-\[\#003366\]/g, 'hover:brightness-110');
        updated = updated.replace(/hover:bg-\[\#004A8F\]/g, 'hover:brightness-110');
        
        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Applied gradients to ${fullPath}`);
        }
      }
    }
  }
};

replaceColors(directory);
console.log('Gradient application complete.');
