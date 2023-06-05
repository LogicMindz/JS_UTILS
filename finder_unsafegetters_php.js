const fs = require('fs');
const path = require('path');

function findFilesWithoutEscapeString(folderPath) {
    const files = fs.readdirSync(folderPath);
    const filesWithoutEscapeString = [];

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        if (filePath.includes('.php')) {
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // Check for occurrences of $_GET or $_POST without escape functions
            if (
                (fileContent.includes('$_GET') || fileContent.includes('$_POST')) &&
                !fileContent.includes('mysql_escape_string') &&
                !fileContent.includes('mysql_real_escape_string')
            ) {
                filesWithoutEscapeString.push(file);
            }
        }
    });

    return filesWithoutEscapeString;
}

// Usage example
const folderPath = 'C:/logicmindz/studioplus/public_html';
const filesWithoutEscapeString = findFilesWithoutEscapeString(folderPath);

console.log('Files without escape functions for $_GET or $_POST:');
console.log(filesWithoutEscapeString);
