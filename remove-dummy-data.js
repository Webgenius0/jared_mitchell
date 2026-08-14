const fs = require('fs');
const path = require('path');

const files = [
  'src/app/(main)/how-winners-are-chosen/Components/WinnersDetails.tsx',
  'src/app/(main)/contest/Components/ArtistStory.tsx',
  'src/app/(main)/contest/Components/Consent.tsx',
  'src/app/(main)/boss-beginnings-contest/Components/roundtwo/RoundTwoAbout.tsx'
];

const dummyString = 'A cozy neighborhood café combining specialty coffee with a curated flower shop. We source beans from fair-trade roasters and partner with local flower farms to bring beauty and warmth to our community.';
const replacementString = 'No information provided yet.';

files.forEach(file => {
  const fullPath = path.join('c:/Users/sarke/Desktop/Sv-Project/jared_mitchell', file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.split(dummyString).join(replacementString);
  fs.writeFileSync(fullPath, content);
  console.log('Fixed', file);
});
