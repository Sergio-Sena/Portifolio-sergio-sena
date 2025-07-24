/**
 * Script para a página de detalhes do projeto
 * Carrega e exibe os detalhes do projeto selecionado
 */

document.addEventListener('DOMContentLoaded', function() {
    // Importar dados dos projetos
    const projectsData = window.projectsData || {};
    
    // Obter ID do projeto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    // Obter container de detalhes do projeto
    const projectDetailsContainer = document.getElementById('project-details');
    
    // Verificar se o projeto existe nos dados
    if (projectId && projectsData[projectId]) {
        const project = projectsData[projectId];
        
        // Construir HTML para os detalhes do projeto
        let html = `
            <h1 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">${project.name}</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div class="md:col-span-2">
                    <div class="h-96 overflow-hidden rounded-xl mb-4 relative">
                        <img src="${project.images[0]}" alt="${project.name}" class="w-full h-full object-cover">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${project.images.slice(1).map(img => `
                            <div class="h-48 overflow-hidden rounded-xl relative">
                                <img src="${img}" alt="${project.name}" class="w-full h-full object-cover">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <div class="bg-gray-700 rounded-xl p-6 mb-6">
                        <h3 class="text-xl font-bold mb-4">Informações do Projeto</h3>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400">Categoria</h4>
                            <p>${project.category}</p>
                        </div>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400">Cliente</h4>
                            <p>${project.client}</p>
                        </div>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400">Data</h4>
                            <p>${project.date}</p>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-cyan-400">Tecnologias</h4>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${project.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="block w-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg py-3 font-bold hover:opacity-90 transition-all text-center">
                        ${projectId === 'devaria' || projectId === 'aws-services' || projectId === 'autodeploy' ? 'Em Desenvolvimento' : 'Ver Projeto'}
                    </a>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4">Descrição</h3>
                    <p class="text-gray-300">${project.description}</p>
                </div>
                
                <div>
                    <h3 class="text-2xl font-bold mb-4">Funcionalidades</h3>
                    <ul class="list-disc pl-5 text-gray-300">
                        ${project.features.map(feature => `
                            <li class="mb-2">${feature}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        // Atualizar container com os detalhes do projeto
        projectDetailsContainer.innerHTML = html;
        
        // Atualizar título da página
        document.title = `${project.name} | Sergio Sena`;
    } else {
        // Projeto não encontrado
        projectDetailsContainer.innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-3xl font-bold mb-4">Projeto não encontrado</h2>
                <p class="text-gray-300 mb-8">O projeto que você está procurando não existe ou foi removido.</p>
                <a href="index.html" class="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full font-bold hover:opacity-90 transition-all">
                    Voltar para a página inicial
                </a>
            </div>
        `;
    }
});