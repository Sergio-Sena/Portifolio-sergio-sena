/**
 * Script para testar a nova estrutura do projeto
 * Este script verifica se todos os arquivos necessários existem
 */

const fs = require('fs');
const path = require('path');

// Lista de arquivos que devem existir
const requiredFiles = [
    'public/index.html',
    'public/certificates.html',
    'public/project-details.html',
    'src/css/style.css',
    'src/css/components/portfolio-compat.css',
    'src/css/components/credly-badge.css',
    'src/js/main.js',
    'src/js/components/contact.js',
    'src/js/pages/certificates.js',
    'src/js/pages/project-details.js',
    'src/js/utils/portfolio-compat.js',
    'src/js/utils/iframe-compat.js',
    'src/data/projects.js',
    'src/data/certificates.js',
    'src/assets/icons/Cloud.ico',
    'docs/ESTRUTURA.md'
];

// Verificar se os arquivos existem
let allFilesExist = true;
const missingFiles = [];

for (const file of requiredFiles) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        allFilesExist = false;
        missingFiles.push(file);
    }
}

// Exibir resultado
if (allFilesExist) {
    console.log('✅ Todos os arquivos necessários existem!');
} else {
    console.log('❌ Alguns arquivos estão faltando:');
    missingFiles.forEach(file => console.log(`   - ${file}`));
}

// Verificar se os arquivos HTML estão referenciando os arquivos corretos
const htmlFiles = [
    'public/index.html',
    'public/certificates.html',
    'public/project-details.html'
];

let allReferencesCorrect = true;
const incorrectReferences = [];

for (const file of htmlFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Verificar referências aos arquivos CSS
        if (!content.includes('../src/css/style.css')) {
            allReferencesCorrect = false;
            incorrectReferences.push(`${file} não referencia ../src/css/style.css`);
        }
        
        // Verificar referências aos arquivos JS
        if (!content.includes('../src/js/main.js')) {
            allReferencesCorrect = false;
            incorrectReferences.push(`${file} não referencia ../src/js/main.js`);
        }
    }
}

// Exibir resultado das referências
if (allReferencesCorrect) {
    console.log('✅ Todas as referências nos arquivos HTML estão corretas!');
} else {
    console.log('❌ Algumas referências nos arquivos HTML estão incorretas:');
    incorrectReferences.forEach(ref => console.log(`   - ${ref}`));
}

// Resultado final
if (allFilesExist && allReferencesCorrect) {
    console.log('\n✅ A nova estrutura do projeto está correta!');
} else {
    console.log('\n❌ A nova estrutura do projeto precisa ser corrigida.');
}