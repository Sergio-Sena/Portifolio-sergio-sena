# Documentação Ritech Fechaduras Digitais

## Visão Geral
Site institucional da Ritech Fechaduras Digitais, especializada em venda e instalação de fechaduras digitais em São Paulo.

## Estrutura do Site
- `Index.html` - Página principal
- `Precificacao.html` - Página de preços e serviços
- `pages/privacidade.html` - Página de política de privacidade
- `assets/` - Recursos estáticos (CSS, JS, imagens)
- `backups/` - Sistema de backup do site

## Tecnologias Utilizadas
- HTML5, CSS3, JavaScript
- TailwindCSS para estilização
- AWS S3 para hospedagem
- CloudFront como CDN

## Detalhes da Configuração AWS

### Domínios
- **Subdomínio Principal**: ritech.sstechnologies-cloud.com
- **Subdomínio WWW**: www.ritech.sstechnologies-cloud.com

### CloudFront
- **ID da Distribuição**: E2DXHLX2VFCW6L
- **Domínio**: d1woz9qgfwb4as.cloudfront.net

### Bucket S3
- **Nome**: ritech-fechaduras-site
- **Política**: Configurada para acesso via CloudFront

## Instruções de Implantação

### Pré-requisitos
- AWS CLI instalado e configurado
- Acesso ao bucket S3 `ritech-fechaduras-site`
- Acesso à distribuição CloudFront `E2DXHLX2VFCW6L`

### Implantação e Atualizações
```bash
# Sincronizar arquivos com o bucket S3
aws s3 sync . s3://ritech-fechaduras-site --exclude "*.md" --exclude "docs/*" --exclude ".git/*"

# Invalidar cache do CloudFront
aws cloudfront create-invalidation --distribution-id E2DXHLX2VFCW6L --paths "/*"
```

### Atualizar arquivos específicos
```bash
# Atualizar um arquivo específico
aws s3 cp index.html s3://ritech-fechaduras-site/

# Invalidar cache específico
aws cloudfront create-invalidation --distribution-id E2DXHLX2VFCW6L --paths "/index.html"
```

## Sistema de Backup
O sistema de backup está implementado com o último backup realizado em 18/06/2025, armazenado em `backups/backup_2025-06-18_21-06-39/`.

## Segurança
- **Headers de Segurança**: Configurados via Lambda@Edge
- **HTTPS**: Forçado para todas as conexões
- **Bucket S3**: Acesso público bloqueado

## Monitoramento
- **CloudWatch Dashboard**: Configurado para monitorar a distribuição CloudFront
- **Métricas**: Requests, Bandwidth, Error Rates

## Comandos Úteis
```bash
# Verificar status da distribuição CloudFront
aws cloudfront get-distribution --id E2DXHLX2VFCW6L --query "Distribution.Status" --output text

# Verificar objetos no bucket S3
aws s3 ls s3://ritech-fechaduras-site --recursive
```