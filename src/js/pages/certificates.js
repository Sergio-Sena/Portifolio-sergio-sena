/**
 * Certificates Manager
 * Script para gerenciar a exibição e upload de certificados
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referência ao formulário de certificados
    const certificateForm = document.getElementById('certificate-form');
    
    // Função para visualizar o PDF antes do upload
    const certFile = document.getElementById('cert-file');
    if (certFile) {
        certFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type === 'application/pdf') {
                // Aqui você poderia adicionar uma prévia do PDF se necessário
                console.log('PDF selecionado:', file.name);
            }
        });
    }
    
    // Função para visualizar o badge antes do upload
    const certBadge = document.getElementById('cert-badge');
    if (certBadge) {
        certBadge.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // Criar uma prévia da imagem
                    const previewContainer = document.createElement('div');
                    previewContainer.className = 'mt-2';
                    previewContainer.id = 'badge-preview';
                    
                    // Remover prévia anterior se existir
                    const existingPreview = document.getElementById('badge-preview');
                    if (existingPreview) {
                        existingPreview.remove();
                    }
                    
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.className = 'h-24 w-auto rounded-lg';
                    img.alt = 'Badge Preview';
                    
                    previewContainer.appendChild(img);
                    certBadge.parentNode.appendChild(previewContainer);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Manipulador de envio do formulário
    if (certificateForm) {
        certificateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(certificateForm);
            
            // Em um ambiente real, aqui você enviaria os dados para um backend
            // Por enquanto, apenas simulamos uma resposta de sucesso
            
            // Mostrar mensagem de sucesso
            const successMessage = document.createElement('div');
            successMessage.className = 'mt-4 p-4 bg-green-500 bg-opacity-20 text-green-300 rounded-lg';
            successMessage.textContent = 'Certificado enviado com sucesso! Em um ambiente de produção, este certificado seria processado e adicionado à sua coleção.';
            
            // Adicionar mensagem após o formulário
            certificateForm.appendChild(successMessage);
            
            // Resetar o formulário após 3 segundos
            setTimeout(() => {
                certificateForm.reset();
                successMessage.remove();
                
                // Remover prévia do badge se existir
                const badgePreview = document.getElementById('badge-preview');
                if (badgePreview) {
                    badgePreview.remove();
                }
            }, 3000);
        });
    }
    
    // Função para filtrar certificados por categoria
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const certificates = document.querySelectorAll('.certificate-card');
            
            certificates.forEach(card => {
                if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});