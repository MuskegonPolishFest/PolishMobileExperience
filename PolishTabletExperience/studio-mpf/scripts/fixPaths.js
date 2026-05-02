const fs = require('fs');

try {
    let c = fs.readFileSync('dist/contentData.js', 'utf8');

    // Replace backslashes with forward slashes inside require() calls
    c = c.replace(/require\(['"]([^'"]+)['"]\)/g, (match, p1) => {
        return `require('${p1.replace(/\\/g, '/')}')`;
    });

    // Clean up absolute or duplicate project paths if necessary
    c = c.replace(/\/PolishMobileExperience\/PolishTabletExperience\//g, '/');

    fs.writeFileSync('dist/contentData.js', c);
    console.log('Fixed paths!');
} catch (e) {
    console.error('Error fixing paths:', e.message);
}
