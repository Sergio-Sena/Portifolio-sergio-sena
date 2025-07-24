/**
 * Script para garantir a compatibilidade dos projetos de portfólio
 * com a versão local do Tailwind CSS
 */
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe de compatibilidade aos iframes que exibem projetos de portfólio
    const projectLinks = document.querySelectorAll('a[href*="portfolio"]');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se o link é para um projeto de portfólio
            if (href && href.includes('portfolio')) {
                // Adicionar classe de compatibilidade ao iframe ou à nova janela
                if (href.includes('STGBR')) {
                    // Projeto STGBR
                    sessionStorage.setItem('portfolio-project', 'stgbr-project');
                } else if (href.includes('Base Imoveis')) {
                    // Projeto Base Imóveis
                    sessionStorage.setItem('portfolio-project', 'base-imoveis-project');
                } else {
                    // Outros projetos
                    sessionStorage.setItem('portfolio-project', 'portfolio-project');
                }
            }
        });
    });
    
    // Se estamos em um iframe de projeto de portfólio, adicionar a classe de compatibilidade
    if (window.self !== window.top) {
        const projectClass = sessionStorage.getItem('portfolio-project');
        if (projectClass) {
            document.body.classList.add(projectClass);
            document.body.classList.add('portfolio-project');
        }
    }
});