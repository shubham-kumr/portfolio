import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'e:/Projects/portfolio/src/content/blog';

function fixImagesInDir(dir) {
  const files = fs.readdirSync(dir);
  
  // Rename the actual image files to remove spaces
  for (const file of files) {
    if (file.includes(' ') && file !== 'index.md') {
      const oldPath = path.join(dir, file);
      const newFile = file.replace(/ /g, '_');
      const newPath = path.join(dir, newFile);
      fs.renameSync(oldPath, newPath);
    }
  }

  // Update index.md image formatting and paths
  const mdPath = path.join(dir, 'index.md');
  if (fs.existsSync(mdPath)) {
    let content = fs.readFileSync(mdPath, 'utf8');
    
    // Convert paths like: ![Pasted image 2026.png](./Pasted image 2026.png)
    // to: ![Pasted image 2026.png](./Pasted_image_2026.png)
    content = content.replace(/\(\.\/([^)]+)\)/g, (match, filename) => {
      // Ensure spaces in the reference are replaced with underscores
      if (filename.includes(' ')) {
         return `(./${filename.replace(/ /g, '_')})`;
      }
      return match;
    });
    
    fs.writeFileSync(mdPath, content);
  }
}

const dirs = fs.readdirSync(BLOG_DIR);
for (const d of dirs) {
  const fullPath = path.join(BLOG_DIR, d);
  if (fs.statSync(fullPath).isDirectory()) {
    fixImagesInDir(fullPath);
  }
}
console.log('Fixed image paths (spaces converted to underscores).');
