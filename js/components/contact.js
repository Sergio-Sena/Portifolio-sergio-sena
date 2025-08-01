/**
 * Script para enviar dados do formulário de contato para WhatsApp
 * Autor: Sergio Sena
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Obter os valores dos campos
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validar campos obrigatórios
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Formatar a mensagem para o WhatsApp
            const whatsappMessage = `*Contato via Site*\n\n*Nome:* ${name}\n*Email:* ${email}\n*Assunto:* ${subject}\n\n*Mensagem:*\n${message}`;
            
            // Número de WhatsApp (com código do país)
            const phoneNumber = '5511984969596';
            
            // Criar a URL do WhatsApp
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Confirmar antes de redirecionar
            if (confirm('Você será redirecionado para o WhatsApp para enviar sua mensagem. Deseja continuar?')) {
                // Redirecionar para o WhatsApp
                window.open(whatsappUrl, '_blank');
                
                // Limpar o formulário
                contactForm.reset();
            }
        });
    }
});