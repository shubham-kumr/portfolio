import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'e:/Projects/portfolio/src/content/blog';
const PUBLIC_IMG_DIR = 'e:/Projects/portfolio/public/images/blog';

// Ensure public images directory exists
fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

function processImagesInDir(dir) {
  const files = fs.readdirSync(dir);
  
  // Move actual image files to public directory
  for (const file of files) {
    if (/\.(png|jpe?g|gif|webp)$/i.test(file)) {
      const oldPath = path.join(dir, file);
      const newPath = path.join(PUBLIC_IMG_DIR, file);
      fs.renameSync(oldPath, newPath);
    }
  }

  // Update index.md image paths to point to public absolute path
  const mdPath = path.join(dir, 'index.md');
  if (fs.existsSync(mdPath)) {
    let content = fs.readFileSync(mdPath, 'utf8');
    
    // Replace markdown image syntax like ![alt](./image.png) -> ![alt](/images/blog/image.png)
    // using regex to match paths that start with ./
    content = content.replace(/\(\.\/([^)]+\.(png|jpe?g|gif|webp))\)/gi, '(/images/blog/$1)');
    
    fs.writeFileSync(mdPath, content);
  }
}

const dirs = fs.readdirSync(BLOG_DIR);
for (const d of dirs) {
  const fullPath = path.join(BLOG_DIR, d);
  // Ensure it's a directory
  if (fs.statSync(fullPath).isDirectory()) {
    processImagesInDir(fullPath);
  }
}

console.log('Moved images to /public/images/blog and updated paths globally.');
