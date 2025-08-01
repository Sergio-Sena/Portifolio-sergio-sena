# Dev-Cloud Portfolio

Portfólio profissional de Sergio Sena - Desenvolvedor Cloud com foco em AWS e soluções serverless.

## 🌟 Características

### 🌍 Internacionalização
- **Detecção automática de região**: Português para Brasil, Inglês para outros países
- **Troca manual de idioma**: Botões em desktop e mobile
- **Persistência**: Preferência salva no localStorage

### 📱 Mobile-First Design
- **Responsivo**: Otimizado para mobile, tablet e desktop
- **Touch-friendly**: Targets de 44px mínimo
- **Performance**: Animações otimizadas e lazy loading

### 🎨 Tecnologias
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Tailwind CSS
- **Animações**: Particles.js
- **Icons**: Font Awesome
- **Cloud**: AWS S3, CloudFront

## 📁 Estrutura do Projeto

```
dev-cloud/
├── public/
│   ├── index.html              # Página principal
│   ├── certificates.html       # Certificações
│   └── project-details.html    # Detalhes dos projetos
├── src/
│   ├── css/
│   │   ├── style.css           # Estilos principais
│   │   └── components/         # CSS modular
│   ├── js/
│   │   ├── translations.js     # Sistema de i18n
│   │   ├── main.js            # Script principal
│   │   └── components/        # Componentes JS
│   ├── data/
│   │   └── projects-translations.js # Traduções dos projetos
│   └── assets/                # Imagens e recursos
└── aws/                       # Configurações AWS
```

## 🚀 Deploy

### AWS S3 + CloudFront
1. Configure bucket S3 para hosting estático
2. Configure CloudFront para distribuição global
3. Use os scripts em `/aws/` para automação

### Desenvolvimento Local
```bash
# Servidor simples Python
python -m http.server 8000

# Ou use qualquer servidor local
# Acesse: http://localhost:8000/public/
```

## 🌐 Idiomas Suportados

- **Português (pt-BR)**: Padrão para usuários do Brasil
- **Inglês (en)**: Padrão para usuários internacionais

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Otimizações Mobile
- Touch targets mínimo 44px
- Font-size 16px em inputs (evita zoom iOS)
- Navegação por gestos
- Cards otimizados para toque

## 🎯 Funcionalidades

### Detecção de Idioma
```javascript
// 1. Verifica localStorage (preferência salva)
// 2. Detecta por IP usando ipapi.co
// 3. Fallback para idioma do navegador
// 4. Fallback final para português
```

### Sistema de Tradução
- Traduções automáticas baseadas em `data-translate`
- Suporte a placeholders de formulários
- Tradução de conteúdo dinâmico (projetos)

## 🔧 Configuração

### Variáveis de Ambiente
- API de geolocalização: `ipapi.co` (gratuita)
- Analytics: Google Analytics (opcional)
- Formulário: AWS API Gateway + Lambda

### Personalização
1. Edite `src/js/translations.js` para adicionar idiomas
2. Modifique `src/css/style.css` para temas
3. Atualize `src/data/projects-translations.js` para projetos

## 📊 Performance

### Otimizações
- Lazy loading de imagens
- CSS minificado em produção
- Particles.js otimizado (40 partículas)
- Prefetch de recursos críticos

### Métricas Alvo
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Mobile Score**: > 90

## 🛠️ Desenvolvimento

### Estrutura de Commits
```
feat: nova funcionalidade
fix: correção de bug  
style: mudanças de estilo
refactor: refatoração de código
docs: documentação
```

### Testes
- Teste em diferentes dispositivos
- Validação de acessibilidade
- Performance testing
- Cross-browser compatibility

## 📞 Contato

**Sergio Sena**
- Email: senanetworker@gmail.com
- LinkedIn: [sergio-sena-cloud](https://linkedin.com/in/sergio-sena-cloud)
- GitHub: [Sergio-Sena](https://github.com/Sergio-Sena)

---

© 2024 Sergio Sena. Todos os direitos reservados.