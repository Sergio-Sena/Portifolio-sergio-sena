# Setup de Deploy Automático

## Secrets necessários no GitHub

Configure os seguintes secrets no repositório GitHub:
**Settings > Secrets and variables > Actions > New repository secret**

### 1. AWS_ACCESS_KEY_ID
- Chave de acesso AWS com permissões S3 e CloudFront
- Exemplo: `AKIA...`

### 2. AWS_SECRET_ACCESS_KEY  
- Chave secreta correspondente
- Exemplo: `wJalrXUt...`

### 3. S3_BUCKET_NAME
- Nome do bucket S3 onde o site será hospedado
- Exemplo: `meu-portfolio-bucket`

### 4. CLOUDFRONT_DISTRIBUTION_ID
- ID da distribuição CloudFront
- Exemplo: `E1234567890ABC`

## Configuração AWS

### S3 Bucket
```bash
# Criar bucket
aws s3 mb s3://meu-portfolio-bucket

# Configurar como site estático
aws s3 website s3://meu-portfolio-bucket \
  --index-document index.html \
  --error-document 404.html
```

### CloudFront Distribution
- Origin: S3 bucket endpoint
- Default Root Object: index.html
- Error Pages: 404.html

### IAM Policy para CI/CD
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::meu-portfolio-bucket",
        "arn:aws:s3:::meu-portfolio-bucket/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "*"
    }
  ]
}
```

## Como funciona

1. **Push para main** → Trigger do workflow
2. **Checkout** → Download do código
3. **AWS Config** → Configuração das credenciais
4. **S3 Sync** → Upload dos arquivos
5. **CloudFront Invalidation** → Limpeza do cache

## Estrutura de Deploy

```
public/           → Raiz do site
├── index.html    → Página principal
├── certificates.html
├── project-details.html
src/              → Assets estáticos
├── css/
├── js/
└── assets/
```