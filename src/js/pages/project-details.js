/**
 * Project Details Page - Internationalization Support
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get project ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    // Wait for translation system to be ready
    const waitForTranslations = () => {
        if (window.languageSystem && window.projectsTranslations) {
            loadProjectDetails(projectId);
        } else {
            setTimeout(waitForTranslations, 100);
        }
    };
    
    waitForTranslations();
});

function loadProjectDetails(projectId) {
    const currentLang = window.languageSystem ? window.languageSystem.currentLang : 'pt';
    const projectDetailsContainer = document.getElementById('project-details');
    
    // Project data with translations
    const projectsData = {
        'autodeploy': {
            pt: {
                name: 'AutoDeploy',
                category: 'DevOps',
                client: 'Projeto Pessoal',
                date: 'Julho 2024',
                technologies: ['AWS', 'GitHub Actions', 'CI/CD', 'Docker', 'Node.js'],
                description: 'Sistema de implantação automática para aplicações web com integração contínua e entrega contínua.',
                features: [
                    'Integração com GitHub Actions para automação de CI/CD',
                    'Deploy automático em ambientes AWS (EC2, ECS, Lambda)',
                    'Testes automatizados antes da implantação',
                    'Notificações de status via Slack/Discord',
                    'Rollback automático em caso de falhas',
                    'Dashboard para monitoramento de deploys'
                ]
            },
            en: {
                name: 'AutoDeploy',
                category: 'DevOps',
                client: 'Personal Project',
                date: 'July 2024',
                technologies: ['AWS', 'GitHub Actions', 'CI/CD', 'Docker', 'Node.js'],
                description: 'Automatic deployment system for web applications with continuous integration and delivery.',
                features: [
                    'GitHub Actions integration for CI/CD automation',
                    'Automatic deployment to AWS environments (EC2, ECS, Lambda)',
                    'Automated testing before deployment',
                    'Status notifications via Slack/Discord',
                    'Automatic rollback on failures',
                    'Dashboard for deployment monitoring'
                ]
            }
        },
        'ritech': {
            pt: window.projectsTranslations?.pt?.ritech || {},
            en: window.projectsTranslations?.en?.ritech || {}
        }
        // Add more projects as needed
    };
    
    // Get project data for current language
    const project = projectsData[projectId]?.[currentLang] || projectsData[projectId]?.pt;
    
    if (project) {
        const images = [
            'https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1488&q=80',
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ];
        
        const viewProjectText = currentLang === 'pt' ? 'Ver Projeto' : 'View Project';
        const inDevelopmentText = currentLang === 'pt' ? 'Em Desenvolvimento' : 'In Development';
        
        const html = `
            <h1 class="text-3xl md:text-4xl font-bold mb-6 gradient-text">${project.name}</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div class="md:col-span-2">
                    <div class="h-96 overflow-hidden rounded-xl mb-4 relative">
                        <img src="${images[0]}" alt="${project.name}" class="w-full h-full object-cover">
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        ${images.slice(1).map(img => `
                            <div class="h-48 overflow-hidden rounded-xl relative">
                                <img src="${img}" alt="${project.name}" class="w-full h-full object-cover">
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div>
                    <div class="bg-gray-700 rounded-xl p-6 mb-6">
                        <h3 class="text-xl font-bold mb-4" data-translate="project.info">Informações do Projeto</h3>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400" data-translate="project.category">Categoria</h4>
                            <p>${project.category}</p>
                        </div>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400" data-translate="project.client">Cliente</h4>
                            <p>${project.client}</p>
                        </div>
                        
                        <div class="mb-4">
                            <h4 class="font-bold text-cyan-400" data-translate="project.date">Data</h4>
                            <p>${project.date}</p>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-cyan-400" data-translate="project.technologies">Tecnologias</h4>
                            <div class="flex flex-wrap gap-2 mt-2">
                                ${project.technologies.map(tech => `
                                    <span class="px-3 py-1 bg-gray-800 rounded-full text-sm">${tech}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <a href="#" class="block w-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg py-3 font-bold hover:opacity-90 transition-all text-center">
                        ${projectId === 'devaria' || projectId === 'autodeploy' ? inDevelopmentText : viewProjectText}
                    </a>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4" data-translate="project.description">Descrição</h3>
                    <p class="text-gray-300">${project.description}</p>
                </div>
                
                <div>
                    <h3 class="text-2xl font-bold mb-4" data-translate="project.features">Funcionalidades</h3>
                    <ul class="list-disc pl-5 text-gray-300">
                        ${project.features.map(feature => `
                            <li class="mb-2">${feature}</li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        projectDetailsContainer.innerHTML = html;
        document.title = `${project.name} | Sergio Sena`;
        
        // Apply translations to the newly created elements
        if (window.languageSystem) {
            window.languageSystem.applyTranslations();
        }
    } else {
        // Project not found
        const notFoundTitle = currentLang === 'pt' ? 'Projeto não encontrado' : 'Project not found';
        const notFoundDesc = currentLang === 'pt' ? 
            'O projeto que você está procurando não existe ou foi removido.' :
            'The project you are looking for does not exist or has been removed.';
        const backText = currentLang === 'pt' ? 'Voltar para a página inicial' : 'Back to homepage';
        
        projectDetailsContainer.innerHTML = `
            <div class="text-center py-12">
                <h2 class="text-3xl font-bold mb-4">${notFoundTitle}</h2>
                <p class="text-gray-300 mb-8">${notFoundDesc}</p>
                <a href="index.html" class="px-8 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full font-bold hover:opacity-90 transition-all">
                    ${backText}
                </a>
            </div>
        `;
    }
}

// Listen for language changes
window.addEventListener('languageChanged', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    loadProjectDetails(projectId);
});