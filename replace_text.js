const fs = require('fs');
const path = require('path');

const directory = './frontend';

// Function to replace branding text
const replaceBrandText = (content) => {
  let updated = content;
  
  // Replace standard cases
  updated = updated.replace(/Mega Press/g, 'Aksara Nusa');
  updated = updated.replace(/MEGA PRESS/g, 'AKSARA NUSA');
  updated = updated.replace(/MegaPress/g, 'AksaraNusa');
  updated = updated.replace(/mega press/gi, 'aksara nusa');
  
  // Handle specific product names like Mega Bookstore
  updated = updated.replace(/Mega Bookstore/g, 'Aksara Nusa Bookstore');
  updated = updated.replace(/Megabookstore/g, 'Aksara Nusa Bookstore');
  
  // Handle lowercases where it might be in text but avoid paths if possible
  // Using negative lookbehind to avoid replacing in URLs like ik.imagekit.io/megapress if they exist
  // However javascript regex doesn't universally support lookbehinds in older versions, 
  // but Node > 10 supports it.
  updated = updated.replace(/(?<![\/\-\.])megapress(?![\.\-\/])/gi, 'aksaranusa');

  return updated;
};

const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        processDirectory(fullPath);
      }
    } else {
      if (['.tsx', '.ts', '.js', '.jsx', '.md'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let updated = replaceBrandText(content);
        
        if (content !== updated) {
          fs.writeFileSync(fullPath, updated, 'utf8');
          console.log(`Updated copywriting in ${fullPath}`);
        }
      }
    }
  }
};

processDirectory(directory);
console.log('Copywriting update complete.');
