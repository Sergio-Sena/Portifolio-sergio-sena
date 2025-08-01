/**
 * Dados dos projetos do portfólio
 * Centraliza as informações dos projetos em um único arquivo
 */

const projectsData = {
    'autodeploy': {
        name: 'AutoDeploy',
        category: 'DevOps',
        client: 'Projeto Pessoal',
        date: 'Julho 2024',
        technologies: ['AWS', 'GitHub Actions', 'CI/CD', 'Docker', 'Node.js'],
        description: 'Sistema de implantação automática para aplicações web com integração contínua e entrega contínua. Permite automatizar todo o processo de deploy desde o commit até a produção.',
        features: [
            'Integração com GitHub Actions para automação de CI/CD',
            'Deploy automático em ambientes AWS (EC2, ECS, Lambda)',
            'Testes automatizados antes da implantação',
            'Notificações de status via Slack/Discord',
            'Rollback automático em caso de falhas',
            'Dashboard para monitoramento de deploys'
        ],
        images: [
            'https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80',
            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: '#'
    },
    'ritech': {
        name: 'Ritech Fechaduras Digitais',
        category: 'E-commerce',
        client: 'Ritech',
        date: 'Junho 2024',
        technologies: ['HTML', 'CSS', 'JavaScript', 'AWS S3', 'CloudFront'],
        description: 'Site para empresa de fechaduras digitais com catálogo de produtos, informações sobre instalação e formulário de contato. O projeto foi desenvolvido com foco em performance e experiência do usuário.',
        features: [
            'Catálogo de produtos com imagens de alta qualidade',
            'Formulário de contato integrado',
            'Design responsivo para todos os dispositivos',
            'Hospedagem em AWS S3 com distribuição via CloudFront',
            'Otimização de imagens para carregamento rápido',
            'Integração com Google Analytics para métricas de acesso'
        ],
        images: [
            './src/assets/images/LogoRitech.jpg',
            'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
            'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: 'https://ritech-fechaduras-digitais.sstechnologies-cloud.com/'
    },
    'stgbr': {
        name: 'Site Corporativo STGBR',
        category: 'Web Design',
        client: 'STGBR Tecnologia',
        date: 'Janeiro 2023',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
        description: 'Site corporativo moderno desenvolvido para a empresa STGBR Tecnologia. O projeto incluiu design responsivo, otimização para SEO e integração com formulário de contato.',
        features: [
            'Design responsivo para todos os dispositivos',
            'Animações suaves para melhor experiência do usuário',
            'Formulário de contato com validação',
            'Otimização para mecanismos de busca',
            'Integração com Google Analytics'
        ],
        images: [
            'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80',
            'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: './public/portfolio/STGBR/index.html'
    },
    'base-imoveis': {
        name: 'Base Imóveis',
        category: 'Web Development',
        client: 'Base Imóveis',
        date: 'Julho 2023',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Bootstrap'],
        description: 'Portal imobiliário completo desenvolvido para a imobiliária Base Imóveis, com sistema de busca avançada, catálogo de propriedades e área administrativa para gerenciamento de imóveis. O projeto foi implementado com foco em usabilidade e experiência do cliente final.',
        features: [
            'Sistema de busca avançada por região, tipo de imóvel, preço e características',
            'Galeria de imóveis com filtros personalizados e ordenação',
            'Páginas detalhadas para cada propriedade com galeria de fotos',
            'Formulário de contato para cada imóvel com envio direto para corretores',
            'Integração com Google Maps para localização dos imóveis',
            'Área administrativa para cadastro e gerenciamento de propriedades',
            'Design responsivo otimizado para dispositivos móveis'
        ],
        images: [
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1496&q=80',
            'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: './public/portfolio/Base Imoveis/index.html'
    },
    'devaria': {
        name: 'Devaria - Rede Social',
        category: 'Full Stack Development',
        client: 'Projeto Pessoal',
        date: 'Abril 2024',
        technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
        description: 'Plataforma de rede social para desenvolvedores compartilharem projetos, conhecimentos e se conectarem com outros profissionais da área.',
        features: [
            'Autenticação de usuários',
            'Feed de postagens personalizado',
            'Sistema de mensagens diretas',
            'Compartilhamento de projetos com GitHub',
            'Fórum de discussão por categorias'
        ],
        images: [
            'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
            'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: './public/portfolio/Devaria/index.html'
    },
    'aws-services': {
        name: 'AWS S3 Explorer',
        category: 'Cloud Computing',
        client: 'Projetos Corporativos',
        date: 'Em desenvolvimento',
        technologies: ['Node.js', 'Express', 'Next.js', 'React', 'TailwindCSS', 'AWS SDK'],
        description: 'Uma aplicação moderna e intuitiva para explorar e gerenciar buckets e objetos do Amazon S3, com interface neon inspirada em temas cyberpunk. Oferece uma experiência visual atraente enquanto fornece funcionalidades completas para gerenciamento de armazenamento em nuvem.',
        features: [
            'Autenticação segura com credenciais AWS (Access Key e Secret Key)',
            'Navegação intuitiva entre buckets e pastas com interface moderna',
            'Visualização detalhada de estatísticas de armazenamento e uso',
            'Download de arquivos e pastas (pastas são baixadas como arquivos ZIP)',
            'Upload de arquivos para qualquer bucket ou pasta',
            'Gerenciamento completo de buckets e objetos (criar, deletar, navegar)',
            'Modo offline para demonstração sem credenciais AWS',
            'Interface responsiva adaptada para dispositivos móveis e desktop'
        ],
        images: [
            'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80'
        ],
        link: 'https://aws-services.sstechnologies-cloud.com/'
    },
    'automacao-sistemas': {
        name: 'Automação de Sistemas',
        category: 'Automação',
        client: 'Diversos',
        date: 'Contínuo',
        technologies: ['Python', 'PySimpleGUI', 'Pandas', 'NumPy'],
        description: 'Aplicação desktop desenvolvida para automatizar tarefas repetitivas de processamento de dados, análise de informações e geração de relatórios. Utiliza interface gráfica intuitiva para facilitar o uso por usuários sem conhecimento técnico.',
        features: [
            'Interface gráfica amigável com PySimpleGUI',
            'Processamento de arquivos CSV e planilhas',
            'Análise estatística de dados com NumPy e Pandas',
            'Geração automática de relatórios',
            'Exportação de resultados em múltiplos formatos',
            'Executável standalone sem necessidade de instalação de Python'
        ],
        images: [
            'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
            'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: './public/portfolio/Automação de sistemas/app.exe'
    },
    'ss-gestao-trafego': {
        name: 'SS Gestão de Tráfego',
        category: 'Marketing Digital',
        client: 'SS Gestão de Tráfego',
        date: 'Dezembro 2024',
        technologies: ['HTML', 'CSS', 'JavaScript', 'AWS S3', 'CloudFront'],
        description: 'Site profissional para agência especializada em Google Ads e Facebook Ads com ROI garantido. Inclui calculadora de ROI interativa e guia completo de IA.',
        features: [
            'Landing page otimizada para conversão',
            'Calculadora de ROI interativa',
            'Guia completo de prompts de IA',
            'Design responsivo mobile-first',
            'SEO otimizado com schema markup',
            'Integração com WhatsApp para leads'
        ],
        images: [
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        ],
        link: 'https://sstrafegopago.sstechnologies-cloud.com/'
    },

};

// Exportar os dados para uso em outros arquivos
if (typeof module !== 'undefined') {
    module.exports = { projectsData };
}