/**
 * Script para garantir a compatibilidade dos iframes que exibem projetos de portfólio
 */
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar classe de compatibilidade aos iframes que exibem projetos de portfólio
    const projectLinks = document.querySelectorAll('a[href*="portfolio"]');
    
    projectLinks.forEach(link => {
        if (link.getAttribute('target') === '_blank') {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Criar um iframe temporário para carregar o projeto
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.src = href;
                
                // Adicionar o iframe ao documento
                document.body.appendChild(iframe);
                
                // Remover o iframe após o carregamento
                iframe.addEventListener('load', function() {
                    // Injetar o CSS de compatibilidade no iframe
                    try {
                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        
                        // Criar um link para o CSS de compatibilidade
                        const link = iframeDoc.createElement('link');
                        link.rel = 'stylesheet';
                        link.href = '../../css/portfolio-compat.css';
                        
                        // Adicionar o link ao head do iframe
                        iframeDoc.head.appendChild(link);
                        
                        // Adicionar classes de compatibilidade ao body do iframe
                        iframeDoc.body.classList.add('portfolio-project');
                        
                        if (href.includes('STGBR')) {
                            iframeDoc.body.classList.add('stgbr-project');
                        } else if (href.includes('Base Imoveis')) {
                            iframeDoc.body.classList.add('base-imoveis-project');
                        }
                    } catch (e) {
                        console.error('Erro ao injetar CSS de compatibilidade:', e);
                    }
                    
                    // Remover o iframe
                    document.body.removeChild(iframe);
                });
            });
        }
    });
});