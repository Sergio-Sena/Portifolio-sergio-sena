# Portfólio | Sergio Sena

Este é o repositório do site de portfólio de Sergio Sena, desenvolvedor web e especialista em soluções de nuvem.

## 🌐 URLs de Produção

- **Portfolio**: https://dev-cloud.sstechnologies-cloud.com


## 🚀 Status da Branch Main

**VERSÃO ESTÁVEL** - Esta branch contém a versão de produção atualmente em funcionamento.

- ✅ Infraestrutura AWS configurada
- ✅ CDNs CloudFront ativos
- ✅ SSL/TLS configurado
- ✅ DNS configurado
- ✅ Buckets S3 seguros com OAC

## 🛠 Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (versão local)
- Font Awesome
- Particles.js
- **AWS**: S3, CloudFront, Route 53, ACM

## 📁 Estrutura do projeto

```
├── public/           # Arquivos HTML e recursos públicos
├── src/             # Código fonte principal
├── docs/            # Documentação
├── config/          # Configurações AWS e scripts
└── README.md        # Este arquivo
```

## 🔧 Configuração AWS

Veja `docs/INFRAESTRUTURA.md` para detalhes completos da infraestrutura.

### Recursos Ativos:
- **S3 Buckets**: portfolio-sergio-sena, ritech-fechaduras-site
- **CloudFront**: E2O2ZMEA7SGXZ4 (Portfolio), EL2N09H69L9HV (Ritech)
- **Route 53**: sstechnologies-cloud.com
- **ACM**: Certificado SSL wildcard

## 📋 Deploy Manual

Para deploy manual, use os scripts em `config/deploy-scripts.ps1`:

```powershell
# Deploy completo
.\config\deploy-scripts.ps1
Deploy-All

# Deploy individual
Deploy-Portfolio
Deploy-Ritech
```

## 🔄 Próximos Passos

1. **CI/CD**: Implementar GitHub Actions para deploy automático
2. **Staging**: Criar ambiente de teste
3. **Monitoramento**: Configurar alertas e métricas

## 📝 Notas de desenvolvimento

- O site usa uma versão local do Tailwind CSS para evitar problemas de produção com o CDN
- Os projetos de portfólio são exibidos em iframes com um sistema de compatibilidade para garantir que funcionem corretamente com o Tailwind CSS local
- O site é responsivo e funciona em dispositivos móveis e desktop
- O formulário de contato envia os dados diretamente para o WhatsApp

---

**Última atualização**: Janeiro 2025  
**Status**: ✅ Produção Estável
