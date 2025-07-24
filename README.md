# Portfólio | Sergio Sena

Este é o repositório do site de portfólio de Sergio Sena, desenvolvedor web e especialista em soluções de nuvem.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (versão local)
- Font Awesome
- Particles.js

## Estrutura do projeto

O projeto foi reorganizado seguindo boas práticas de desenvolvimento web:

- `public/`: Arquivos HTML e recursos públicos
  - `index.html`: Página principal do site
  - `certificates.html`: Página de certificados
  - `project-details.html`: Página de detalhes dos projetos
- `src/`: Código fonte principal
  - `assets/`: Recursos estáticos (imagens, ícones, etc.)
  - `css/`: Estilos CSS
  - `js/`: Scripts JavaScript
  - `data/`: Dados estáticos (projetos, certificados)
- `docs/`: Documentação do projeto

Para mais detalhes sobre a estrutura, consulte o arquivo `docs/ESTRUTURA.md`.

## Como executar o projeto

1. Clone o repositório
2. Abra o arquivo `public/index.html` em um navegador web

## Notas de desenvolvimento

- O site usa uma versão local do Tailwind CSS para evitar problemas de produção com o CDN
- Os projetos de portfólio são exibidos em iframes com um sistema de compatibilidade para garantir que funcionem corretamente com o Tailwind CSS local
- O site é responsivo e funciona em dispositivos móveis e desktop
- O formulário de contato envia os dados diretamente para o WhatsApp