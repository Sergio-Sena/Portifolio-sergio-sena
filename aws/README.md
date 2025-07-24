# Implantação do Site de Portfólio na AWS

Este guia explica como implantar o site de portfólio na AWS usando uma arquitetura serverless com S3, CloudFront e Route 53.

## Arquitetura

- **Amazon S3**: Armazenamento dos arquivos estáticos do site
- **Amazon CloudFront**: CDN para entrega rápida do conteúdo
- **Amazon Route 53**: Gerenciamento de domínio e DNS
- **AWS Lambda + API Gateway**: Backend serverless para o formulário de contato
- **AWS Certificate Manager**: Certificado SSL/TLS para HTTPS

## Pré-requisitos

1. Conta AWS ativa
2. AWS CLI instalado e configurado
3. Domínio registrado (pode ser registrado via Route 53)
4. PowerShell (para Windows) ou Bash (para Linux/Mac)

## Passos para Implantação

### 1. Criar um certificado SSL/TLS no AWS Certificate Manager

1. Acesse o console do AWS Certificate Manager
2. Solicite um certificado público
3. Adicione seu domínio (exemplo.com) e subdomínio (www.exemplo.com)
4. Valide o certificado seguindo as instruções (geralmente via DNS ou email)
5. Anote o ARN do certificado para uso posterior

### 2. Criar a infraestrutura usando CloudFormation

```powershell
# Navegue até a pasta aws
cd aws

# Implante o template principal
aws cloudformation create-stack `
  --stack-name portfolio-website `
  --template-body file://template.yaml `
  --parameters ParameterKey=DomainName,ParameterValue=seudominio.com ParameterKey=CertificateArn,ParameterValue=seu-certificado-arn `
  --capabilities CAPABILITY_IAM
```

### 3. Configurar o formulário de contato (opcional)

```powershell
# Implante o template do formulário de contato
aws cloudformation create-stack `
  --stack-name portfolio-contact-form `
  --template-body file://contact-form.yaml `
  --parameters ParameterKey=EmailDestination,ParameterValue=seu-email@exemplo.com `
  --capabilities CAPABILITY_IAM
```

### 4. Implantar o site

Após a criação da infraestrutura, use o script de implantação para enviar os arquivos do site para o S3:

```powershell
# Obtenha o nome do bucket S3 e o ID da distribuição CloudFront
$BucketName = aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text
$DistributionId = aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text

# Execute o script de implantação
.\deploy.ps1 -BucketName $BucketName -DistributionId $DistributionId
```

### 5. Atualizar o formulário de contato no site

Após a implantação do backend do formulário de contato, obtenha a URL da API:

```powershell
$ApiEndpoint = aws cloudformation describe-stacks --stack-name portfolio-contact-form --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text
```

Atualize o arquivo `js/script.js` com a URL da API para o formulário de contato.

## Manutenção e Atualizações

Para atualizar o site após alterações:

```powershell
.\deploy.ps1 -BucketName $BucketName -DistributionId $DistributionId
```

## Monitoramento e Custos

- Configure alertas de custo no AWS Billing
- Monitore o tráfego usando o CloudWatch
- Verifique as métricas do CloudFront para otimizar a entrega de conteúdo

## Segurança

- Mantenha as credenciais da AWS seguras
- Revise regularmente as permissões IAM
- Ative o AWS CloudTrail para auditoria