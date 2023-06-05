const fs = require('fs');
const path = require('path');

function findFilesWithoutString(folderPath, searchString) {
    // Read all files in the folder
    const files = fs.readdirSync(folderPath);
    console.log('>>>>>>>>>>>> Lista de arquivos no diretório : ', files)
    // Filter out files that don't contain the search string
    const filesWithoutString = files.filter((file) => {

        const filePath = path.join(folderPath, file);
        // console.log('filepath is', filePath)
        // validar que o arquqivo inclui .php
        if (filePath.includes('.php') == false) {
            console.log('oFILE is not php', file)
            return;
        }
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return !fileContent.includes(searchString);
    });

    return filesWithoutString;
}

// Usage example
const folderPath = 'logicmindz/SearchPath';
const searchString = 'SearchString';
const filesWithoutString = findFilesWithoutString(folderPath, searchString);

console.log('Files without the search string:');
console.log(filesWithoutString);
