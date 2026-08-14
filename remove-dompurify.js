const fs = require('fs');
const path = require('path');

const files = [
  'src/lib/business.ts',
  'src/app/(main)/_components/BossBeginnings.tsx',
  'src/app/(main)/events/_Components/UpcomingEvents.tsx',
  'src/app/(main)/events/_Components/EventHighlight.tsx',
  'src/app/(main)/contest/Components/SpotlightDetails.tsx',
  'src/app/(main)/contest/Components/OptionalInformation.tsx',
  'src/app/(main)/contest/Components/ArtistStory.tsx'
];

files.forEach(file => {
  const fullPath = path.join('c:/Users/sarke/Desktop/Sv-Project/jared_mitchell', file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');

  // Remove imports
  content = content.replace(/import DOMPurify from ["'](isomorphic-dompurify|dompurify)["'];\n?/g, '');

  // For { ALLOWED_TAGS: [] } usage (stripping HTML)
  content = content.replace(/DOMPurify\.sanitize\(([^,]+),\s*\{\s*ALLOWED_TAGS:\s*\[\]\s*\}\)/g, '($1 || "").replace(/<[^>]*>?/gm, "")');

  // For regular DOMPurify.sanitize(x)
  content = content.replace(/DOMPurify\.sanitize\((.*?)\)/g, '$1');

  fs.writeFileSync(fullPath, content);
  console.log('Fixed', file);
});
