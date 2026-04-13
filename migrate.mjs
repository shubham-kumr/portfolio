import fs from 'fs';
import path from 'path';

// Helper to convert string to slug
const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const BLOG_DIR = 'e:/Projects/portfolio/src/content/blog';
const VAULT_DIR = 'E:/Projects/portfolio/Obsidian Vault';
const EXPLOIT_DIR = path.join(VAULT_DIR, 'Exploit Report');
const THM_DIR = path.join(VAULT_DIR, 'TryHackMe Walkthrough');

// Clean blog directory
fs.rmSync(BLOG_DIR, { recursive: true, force: true });
fs.mkdirSync(BLOG_DIR, { recursive: true });

function getAllImages(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for(let file of list) {
      if(file === '.obsidian') continue;
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if(stat && stat.isDirectory()) {
        results = results.concat(getAllImages(file));
      } else {
        if(/\.(png|jpe?g|gif|webp)$/i.test(file)) {
          results.push(file);
        }
      }
    }
  } catch(e) {}
  return results;
}

console.log("Scanning vault for images...");
const allImages = getAllImages(VAULT_DIR);
const imageMap = {};
for(const imgPath of allImages) {
  imageMap[path.basename(imgPath)] = imgPath;
}
console.log(`Found ${allImages.length} images.`);

function findImage(filename) {
  return imageMap[filename] || null;
}

let currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() - 3); // Start 3 months ago

function processMarkdown(content, destDir) {
  // Replace obsidian ![[img|size]] syntax
  const imgRegex = /!\[\[([^\]]+)\]\]/g;
  let newContent = content.replace(imgRegex, (match, param) => {
    const filename = param.split('|')[0].trim();
    // Copy the image if we can find it
    const imgPath = findImage(filename);
    if (imgPath) {
      fs.copyFileSync(imgPath, path.join(destDir, filename));
    } else {
      console.warn('Image not found in vault:', filename);
    }
    return `![${filename}](./${filename})`;
  });
  return newContent;
}

function createPost(srcFile, tags) {
  const parsed = path.parse(srcFile);
  if (parsed.ext !== '.md') return;

  const slug = slugify(parsed.name);
  const destDir = path.join(BLOG_DIR, slug);
  fs.mkdirSync(destDir, { recursive: true });

  const content = fs.readFileSync(srcFile, 'utf8');
  let processedContent = processMarkdown(content, destDir);
  
  // Try to create a snippet as a summary
  const summaryMatch = processedContent.match(/^(?!#|>|!|\s*$)(.+)$/m);
  let summary = summaryMatch ? summaryMatch[0].substring(0, 150) + "..." : "A detailed cybersecurity write-up.";

  // Construct frontmatter
  const frontmatter = `---
title: "${parsed.name}"
summary: "${summary.replace(/"/g, '\\"')}"
date: "${currentDate.toISOString().split('T')[0]}"
tags: ${JSON.stringify(tags)}
---
`;

  fs.writeFileSync(path.join(destDir, 'index.md'), frontmatter + '\n' + processedContent);

  // Increment date by 3 days for the next post
  currentDate.setDate(currentDate.getDate() + 3);
}

// 1. Process exploit reports
if (fs.existsSync(EXPLOIT_DIR)) {
  for (const file of fs.readdirSync(EXPLOIT_DIR)) {
    createPost(path.join(EXPLOIT_DIR, file), ["exploit", "security"]);
  }
}

// Increment start date to 2 months ago for THM
currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() - 2);

// 2. Process TryHackMe
if (fs.existsSync(THM_DIR)) {
  for (const file of fs.readdirSync(THM_DIR)) {
    createPost(path.join(THM_DIR, file), ["tryhackme", "walkthrough"]);
  }
}

console.log("Migration complete.");
