const fs = require('fs');
const path = require('path');

function fixUnsafeGetPostAssignments(folderPath) {
    const files = fs.readdirSync(folderPath);

    files.forEach((file) => {
        const filePath = path.join(folderPath, file);

        if (file === 'arte.php' && filePath.includes('.php')) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const lines = fileContent.split('\n');
            let updatedContent = '';

            // Check each line for occurrences of $_GET or $_POST without escape functions
            lines.forEach((line, lineNumber) => {
                let updatedLine = line;

                if (
                    (line.includes('$_GET') || line.includes('$_POST')) &&
                    !line.includes('mysql_escape_string') &&
                    !line.includes('mysql_real_escape_string')
                ) {
                    // Fix the unsafe assignment in the line by adding mysql_escape_string
                    updatedLine = line.replace(/(\$_GET|\$_POST)\[.*?\]/g, (match) => {
                        const escapedMatch = `mysql_escape_string(${match})`;
                        return escapedMatch;
                    });
                }

                updatedContent += updatedLine + '\n';
            });

            // Write the updated content back to the file
            fs.writeFileSync(filePath, updatedContent, 'utf8');
        }
    });
}

// Usage example
const folderPath = 'C:/logicmindz/studioplus/public_html';
fixUnsafeGetPostAssignments(folderPath);

console.log('Unsafe $_GET and $_POST assignments fixed for arte.php.');
