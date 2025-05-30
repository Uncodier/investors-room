#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find all .mdx files
function findMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .git directories
      if (!['node_modules', '.git', '.next'].includes(file)) {
        findMdxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to fix arrow symbols in anchor tags
function fixArrowInLinks(content) {
  // Pattern to find anchor tags that contain arrow symbols
  // This could be causing auto-linking issues
  const arrowPattern = /(<a[^>]*>[\s\S]*?)→([\s\S]*?<\/a>)/g;
  
  let fixedContent = content.replace(arrowPattern, (match, beforeArrow, afterArrow) => {
    // Replace the arrow with a span-wrapped arrow to prevent auto-linking
    return `${beforeArrow}<span>→</span>${afterArrow}`;
  });
  
  // Also fix any other potential auto-linking symbols
  const symbolPattern = /(<a[^>]*>[\s\S]*?)([\u2192\u2190\u2191\u2193\u21D2\u21D0\u21D1\u21D3])([\s\S]*?<\/a>)/g;
  
  fixedContent = fixedContent.replace(symbolPattern, (match, before, symbol, after) => {
    return `${before}<span>${symbol}</span>${after}`;
  });
  
  return fixedContent;
}

// Main function
function main() {
  const projectRoot = __dirname;
  const mdxFiles = findMdxFiles(projectRoot);
  
  console.log(`Found ${mdxFiles.length} MDX files to process:`);
  
  let totalFixed = 0;
  
  mdxFiles.forEach(filePath => {
    try {
      const relativePath = path.relative(projectRoot, filePath);
      console.log(`Processing: ${relativePath}`);
      
      const originalContent = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixArrowInLinks(originalContent);
      
      if (originalContent !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        console.log(`  ✅ Fixed arrow symbols in ${relativePath}`);
        totalFixed++;
      } else {
        console.log(`  ⏭️  No arrow issues found in ${relativePath}`);
      }
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n🎉 Processing complete! Fixed ${totalFixed} files.`);
  
  if (totalFixed > 0) {
    console.log('\n📝 Summary of changes:');
    console.log('- Wrapped arrow symbols (→) in <span> tags inside anchor elements');
    console.log('- Prevented auto-linking of directional symbols');
    console.log('\nThis should resolve the nested anchor tag hydration errors.');
  }
}

// Run the script
main(); 