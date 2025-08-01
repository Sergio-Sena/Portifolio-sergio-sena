# Script para configurar e implantar o site de portfólio na AWS
param (
    [switch]$SkipInfra,
    [switch]$SkipDeploy,
    [switch]$SkipContactForm
)

# Carregar configurações
$configFile = Join-Path $PSScriptRoot "config.json"
if (-not (Test-Path $configFile)) {
    Write-Host "Arquivo de configuração não encontrado: $configFile" -ForegroundColor Red
    exit 1
}

$config = Get-Content $configFile | ConvertFrom-Json
$domain = $config.domain
$region = $config.region
$profile = $config.profile
$contactEmail = $config.contactEmail

# Verificar se o AWS CLI está instalado
try {
    $awsVersion = aws --version
    Write-Host "AWS CLI encontrado: $awsVersion" -ForegroundColor Green
}
catch {
    Write-Host "AWS CLI não encontrado. Por favor, instale o AWS CLI: https://aws.amazon.com/cli/" -ForegroundColor Red
    exit 1
}

# Configurar o perfil da AWS CLI se necessário
if ($profile -ne "default") {
    Write-Host "Usando perfil AWS: $profile" -ForegroundColor Yellow
    $env:AWS_PROFILE = $profile
}

# Função para verificar se um certificado SSL/TLS existe
function Get-Certificate {
    param (
        [string]$Domain
    )
    
    Write-Host "Verificando certificado para $Domain..." -ForegroundColor Yellow
    
    $certificates = aws acm list-certificates --region $region | ConvertFrom-Json
    
    foreach ($cert in $certificates.CertificateSummaryList) {
        if ($cert.DomainName -eq $Domain -or $cert.DomainName -eq "*.$Domain") {
            Write-Host "Certificado encontrado para $Domain: $($cert.CertificateArn)" -ForegroundColor Green
            return $cert.CertificateArn
        }
    }
    
    Write-Host "Nenhum certificado encontrado para $Domain" -ForegroundColor Yellow
    Write-Host "Solicitando novo certificado..." -ForegroundColor Yellow
    
    $certArn = aws acm request-certificate --domain-name $Domain --validation-method DNS --subject-alternative-names "www.$Domain" --region $region | ConvertFrom-Json
    
    Write-Host "Certificado solicitado: $($certArn.CertificateArn)" -ForegroundColor Green
    Write-Host "IMPORTANTE: Você precisa validar o certificado antes de continuar." -ForegroundColor Red
    Write-Host "Verifique o console do AWS Certificate Manager para obter instruções de validação." -ForegroundColor Red
    
    $confirmation = Read-Host "O certificado foi validado? (S/N)"
    if ($confirmation -ne "S" -and $confirmation -ne "s") {
        Write-Host "Implantação cancelada. Valide o certificado e tente novamente." -ForegroundColor Red
        exit 1
    }
    
    return $certArn.CertificateArn
}

# Criar a infraestrutura principal
if (-not $SkipInfra) {
    Write-Host "Configurando infraestrutura principal..." -ForegroundColor Yellow
    
    # Verificar se o certificado existe
    $certArn = Get-Certificate -Domain $domain
    
    # Verificar se a zona hospedada existe no Route 53
    $hostedZones = aws route53 list-hosted-zones | ConvertFrom-Json
    $hostedZoneExists = $false
    $hostedZoneId = ""
    
    foreach ($zone in $hostedZones.HostedZones) {
        if ($zone.Name -eq "$domain.") {
            $hostedZoneExists = $true
            $hostedZoneId = $zone.Id.Replace("/hostedzone/", "")
            Write-Host "Zona hospedada encontrada para $domain: $hostedZoneId" -ForegroundColor Green
            break
        }
    }
    
    if (-not $hostedZoneExists) {
        Write-Host "Zona hospedada não encontrada para $domain" -ForegroundColor Yellow
        Write-Host "Criando nova zona hospedada..." -ForegroundColor Yellow
        
        $newZone = aws route53 create-hosted-zone --name $domain --caller-reference $(Get-Date -Format "yyyyMMddHHmmss") | ConvertFrom-Json
        $hostedZoneId = $newZone.HostedZone.Id.Replace("/hostedzone/", "")
        
        Write-Host "Zona hospedada criada: $hostedZoneId" -ForegroundColor Green
        Write-Host "IMPORTANTE: Atualize os servidores de nome do seu domínio para usar os servidores do Route 53." -ForegroundColor Red
        Write-Host "Servidores de nome:" -ForegroundColor Yellow
        
        foreach ($ns in $newZone.DelegationSet.NameServers) {
            Write-Host "  - $ns" -ForegroundColor Yellow
        }
        
        $confirmation = Read-Host "Os servidores de nome foram atualizados? (S/N)"
        if ($confirmation -ne "S" -and $confirmation -ne "s") {
            Write-Host "Implantação cancelada. Atualize os servidores de nome e tente novamente." -ForegroundColor Red
            exit 1
        }
    }
    
    # Implantar o template CloudFormation
    Write-Host "Implantando infraestrutura via CloudFormation..." -ForegroundColor Yellow
    
    $stackName = "portfolio-website"
    $templateFile = Join-Path $PSScriptRoot "template.yaml"
    
    # Verificar se a stack já existe
    $stacks = aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE | ConvertFrom-Json
    $stackExists = $false
    
    foreach ($stack in $stacks.StackSummaries) {
        if ($stack.StackName -eq $stackName) {
            $stackExists = $true
            break
        }
    }
    
    if ($stackExists) {
        Write-Host "Atualizando stack existente: $stackName" -ForegroundColor Yellow
        
        aws cloudformation update-stack `
            --stack-name $stackName `
            --template-body file://$templateFile `
            --parameters ParameterKey=DomainName,ParameterValue=$domain ParameterKey=CertificateArn,ParameterValue=$certArn `
            --capabilities CAPABILITY_IAM
    }
    else {
        Write-Host "Criando nova stack: $stackName" -ForegroundColor Yellow
        
        aws cloudformation create-stack `
            --stack-name $stackName `
            --template-body file://$templateFile `
            --parameters ParameterKey=DomainName,ParameterValue=$domain ParameterKey=CertificateArn,ParameterValue=$certArn `
            --capabilities CAPABILITY_IAM
    }
    
    Write-Host "Aguardando a conclusão da implantação da infraestrutura..." -ForegroundColor Yellow
    aws cloudformation wait stack-create-complete --stack-name $stackName
    
    if ($LASTEXITCODE -ne 0) {
        aws cloudformation wait stack-update-complete --stack-name $stackName
    }
    
    Write-Host "Infraestrutura implantada com sucesso!" -ForegroundColor Green
}

# Configurar o formulário de contato
if (-not $SkipContactForm) {
    Write-Host "Configurando formulário de contato..." -ForegroundColor Yellow
    
    $contactFormStackName = "portfolio-contact-form"
    $contactFormTemplateFile = Join-Path $PSScriptRoot "contact-form.yaml"
    
    # Verificar se a stack já existe
    $stacks = aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE | ConvertFrom-Json
    $stackExists = $false
    
    foreach ($stack in $stacks.StackSummaries) {
        if ($stack.StackName -eq $contactFormStackName) {
            $stackExists = $true
            break
        }
    }
    
    if ($stackExists) {
        Write-Host "Atualizando stack existente: $contactFormStackName" -ForegroundColor Yellow
        
        aws cloudformation update-stack `
            --stack-name $contactFormStackName `
            --template-body file://$contactFormTemplateFile `
            --parameters ParameterKey=EmailDestination,ParameterValue=$contactEmail `
            --capabilities CAPABILITY_IAM
    }
    else {
        Write-Host "Criando nova stack: $contactFormStackName" -ForegroundColor Yellow
        
        aws cloudformation create-stack `
            --stack-name $contactFormStackName `
            --template-body file://$contactFormTemplateFile `
            --parameters ParameterKey=EmailDestination,ParameterValue=$contactEmail `
            --capabilities CAPABILITY_IAM
    }
    
    Write-Host "Aguardando a conclusão da implantação do formulário de contato..." -ForegroundColor Yellow
    aws cloudformation wait stack-create-complete --stack-name $contactFormStackName
    
    if ($LASTEXITCODE -ne 0) {
        aws cloudformation wait stack-update-complete --stack-name $contactFormStackName
    }
    
    Write-Host "Formulário de contato implantado com sucesso!" -ForegroundColor Green
    
    # Obter a URL da API
    $apiEndpoint = aws cloudformation describe-stacks --stack-name $contactFormStackName --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text
    
    Write-Host "URL da API do formulário de contato: $apiEndpoint" -ForegroundColor Green
    
    # Atualizar o arquivo script.js com a URL da API
    $scriptFile = Join-Path (Split-Path -Parent $PSScriptRoot) "js\script.js"
    $scriptContent = Get-Content $scriptFile -Raw
    $updatedScript = $scriptContent -replace "const apiUrl = 'https://API_ID.execute-api.REGION.amazonaws.com/prod/contact'", "const apiUrl = '$apiEndpoint'"
    Set-Content -Path $scriptFile -Value $updatedScript
    
    Write-Host "Arquivo script.js atualizado com a URL da API" -ForegroundColor Green
}

# Implantar o site
if (-not $SkipDeploy) {
    Write-Host "Implantando o site..." -ForegroundColor Yellow
    
    # Obter o nome do bucket S3 e o ID da distribuição CloudFront
    $bucketName = aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text
    $distributionId = aws cloudformation describe-stacks --stack-name portfolio-website --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" --output text
    
    if (-not $bucketName) {
        Write-Host "Não foi possível obter o nome do bucket S3. Verifique se a stack foi implantada corretamente." -ForegroundColor Red
        exit 1
    }
    
    # Executar o script de implantação
    $deployScript = Join-Path $PSScriptRoot "deploy.ps1"
    & $deployScript -BucketName $bucketName -DistributionId $distributionId
    
    Write-Host "Site implantado com sucesso!" -ForegroundColor Green
    Write-Host "URL do site: https://$domain" -ForegroundColor Green
}

Write-Host "Processo de implantação concluído!" -ForegroundColor Green