/**
 * Traduções dos Projetos
 * Dados traduzidos para inglês dos projetos do portfólio
 */

const projectsTranslations = {
    pt: {
        'ritech': {
            name: 'Ritech Fechaduras Digitais',
            description: 'Site para empresa de fechaduras digitais com catálogo de produtos e formulário de contato.',
            category: 'E-commerce',
            client: 'Ritech',
            date: 'Junho 2024',
            features: [
                'Catálogo de produtos com imagens de alta qualidade',
                'Formulário de contato integrado',
                'Design responsivo para todos os dispositivos',
                'Hospedagem em AWS S3 com distribuição via CloudFront',
                'Otimização de imagens para carregamento rápido',
                'Integração com Google Analytics para métricas de acesso'
            ]
        },
        'stgbr': {
            name: 'Site Corporativo STGBR',
            description: 'Um site moderno para empresa de tecnologia com design responsivo e animações fluidas.',
            category: 'Web Design',
            client: 'STGBR Tecnologia',
            date: 'Janeiro 2023'
        },
        'base-imoveis': {
            name: 'Base Imóveis',
            description: 'Portal imobiliário com listagem de propriedades e sistema de busca por região.',
            category: 'Web Development',
            client: 'Base Imóveis',
            date: 'Julho 2023'
        },
        'devaria': {
            name: 'Devaria',
            description: 'Releitura de rede social utilizando tecnologias modernas e arquitetura serverless.',
            category: 'Full Stack Development',
            client: 'Projeto Pessoal',
            date: 'Abril 2024'
        },
        'autodeploy': {
            name: 'AutoDeploy',
            description: 'Sistema de implantação automática para aplicações web com integração contínua e entrega contínua.',
            category: 'DevOps',
            client: 'Projeto Pessoal',
            date: 'Julho 2024'
        },
        'aws-services': {
            name: 'AWS Services Dashboard',
            description: 'Aplicação moderna para gerenciar buckets e objetos do Amazon S3 com interface neon cyberpunk.',
            category: 'Cloud Computing',
            client: 'Projetos Corporativos',
            date: 'Janeiro 2025'
        },
        'automacao-sistemas': {
            name: 'Automação de Sistemas',
            description: 'Aplicação desktop para automatizar tarefas repetitivas de processamento de dados e geração de relatórios.',
            category: 'Automação',
            client: 'Diversos',
            date: 'Contínuo'
        }
    },
    
    en: {
        'ritech': {
            name: 'Ritech Digital Locks',
            description: 'Website for digital locks company with product catalog and contact form.',
            category: 'E-commerce',
            client: 'Ritech',
            date: 'June 2024',
            features: [
                'Product catalog with high-quality images',
                'Integrated contact form',
                'Responsive design for all devices',
                'AWS S3 hosting with CloudFront distribution',
                'Image optimization for fast loading',
                'Google Analytics integration for access metrics'
            ]
        },
        'stgbr': {
            name: 'STGBR Corporate Website',
            description: 'A modern website for technology company with responsive design and smooth animations.',
            category: 'Web Design',
            client: 'STGBR Technology',
            date: 'January 2023'
        },
        'base-imoveis': {
            name: 'Base Real Estate',
            description: 'Real estate portal with property listings and region-based search system.',
            category: 'Web Development',
            client: 'Base Real Estate',
            date: 'July 2023'
        },
        'devaria': {
            name: 'Devaria',
            description: 'Social network reimagining using modern technologies and serverless architecture.',
            category: 'Full Stack Development',
            client: 'Personal Project',
            date: 'April 2024'
        },
        'autodeploy': {
            name: 'AutoDeploy',
            description: 'Automatic deployment system for web applications with continuous integration and delivery.',
            category: 'DevOps',
            client: 'Personal Project',
            date: 'July 2024'
        },
        'aws-services': {
            name: 'AWS Services Dashboard',
            description: 'Modern application to manage Amazon S3 buckets and objects with cyberpunk neon interface.',
            category: 'Cloud Computing',
            client: 'Corporate Projects',
            date: 'January 2025'
        },
        'automacao-sistemas': {
            name: 'Systems Automation',
            description: 'Desktop application to automate repetitive data processing tasks and report generation.',
            category: 'Automation',
            client: 'Various',
            date: 'Ongoing'
        }
    }
};

// Função para obter tradução do projeto
function getProjectTranslation(projectId, lang = 'pt') {
    return projectsTranslations[lang][projectId] || projectsTranslations.pt[projectId];
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.projectsTranslations = projectsTranslations;
    window.getProjectTranslation = getProjectTranslation;
}