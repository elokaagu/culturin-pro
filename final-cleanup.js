const fs = require('fs');
const path = require('path');

// Function to recursively find all files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat && stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to update file content with final cleanup
function updateFileContent(content) {
  let updated = content;
  
  // Update remaining import statements
  updated = updated.replace(/from\s+["']@\/data\/itineraryData["']/g, 'from "@/data/experienceData"');
  updated = updated.replace(/from\s+["']@\/lib\/itinerary-service["']/g, 'from "@/lib/experience-service"');
  updated = updated.replace(/from\s+["']@\/hooks\/useItineraries["']/g, 'from "@/hooks/useExperiences"');
  
  // Update remaining variable names
  updated = updated.replace(/\bselectedItinerary\b/g, 'selectedExperience');
  updated = updated.replace(/\bonItinerarySave\b/g, 'onExperienceSave');
  updated = updated.replace(/\bhandleItinerarySave\b/g, 'handleExperienceSave');
  updated = updated.replace(/\bnewItinerary\b/g, 'newExperience');
  updated = updated.replace(/\bsavedItinerary\b/g, 'savedExperience');
  updated = updated.replace(/\bsampleItinerary\b/g, 'sampleExperience');
  
  // Update remaining function names
  updated = updated.replace(/\bloadItinerariesFromDatabase\b/g, 'loadExperiencesFromDatabase');
  updated = updated.replace(/\bcheckItineraries\b/g, 'checkExperiences');
  
  // Update remaining comments
  updated = updated.replace(/\/\/ Load itineraries/g, '// Load experiences');
  updated = updated.replace(/\/\/ Create a new itinerary/g, '// Create a new experience');
  updated = updated.replace(/\/\/ The saved itinerary/g, '// The saved experience');
  
  return updated;
}

// Main execution
console.log('🔄 Starting final cleanup of remaining itinerary references...');

const files = findFiles('.');
let updatedCount = 0;

files.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const updatedContent = updateFileContent(content);
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      updatedCount++;
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
});

console.log(`\n🎉 Final cleanup complete! Modified ${updatedCount} files.`);
console.log('\n📝 Next steps:');
console.log('1. Test the build: npm run build');
console.log('2. If successful, commit and push changes');
console.log('3. Test the application to ensure experiences work correctly');
