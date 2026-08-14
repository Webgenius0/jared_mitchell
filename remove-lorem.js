const fs = require('fs');
const path = require('path');

const files = [
  'src/app/auth/forget-password/page.tsx',
  'src/app/auth/verify-otp/page.tsx',
  'src/app/auth/reset-password/page.tsx',
  'src/app/auth/register/page.tsx',
  'src/app/auth/login/page.tsx'
];

const loremIpsum1 = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."';
const loremIpsum2 = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit."';

files.forEach(file => {
  const fullPath = path.join('c:/Users/sarke/Desktop/Sv-Project/jared_mitchell', file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(loremIpsum1, '""');
  content = content.replace(loremIpsum2, '""');
  fs.writeFileSync(fullPath, content);
  console.log('Fixed', file);
});
