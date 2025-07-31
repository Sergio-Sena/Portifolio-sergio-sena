# Script para adicionar cache behavior para dev-cloud
param(
    [string]$DistributionId = "E3FUU8LKMW773I"
)

Write-Host "Adicionando cache behavior para dev-cloud..." -ForegroundColor Yellow

# Baixar configuração atual
aws cloudfront get-distribution-config --id $DistributionId --output json > config.json

$config = Get-Content config.json | ConvertFrom-Json
$etag = $config.ETag
$distConfig = $config.DistributionConfig

# Adicionar novo cache behavior para dev-cloud
$newBehavior = @{
    PathPattern = "dev-cloud/*"
    TargetOriginId = "portfolio-origin"
    TrustedSigners = @{
        Enabled = $false
        Quantity = 0
    }
    TrustedKeyGroups = @{
        Enabled = $false
        Quantity = 0
    }
    ViewerProtocolPolicy = "redirect-to-https"
    AllowedMethods = @{
        Quantity = 3
        Items = @("HEAD", "GET", "OPTIONS")
        CachedMethods = @{
            Quantity = 2
            Items = @("HEAD", "GET")
        }
    }
    SmoothStreaming = $false
    Compress = $true
    LambdaFunctionAssociations = @{
        Quantity = 0
    }
    FunctionAssociations = @{
        Quantity = 0
    }
    FieldLevelEncryptionId = ""
    CachePolicyId = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    OriginRequestPolicyId = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf"
}

# Adicionar à lista de behaviors
$distConfig.CacheBehaviors.Items += $newBehavior
$distConfig.CacheBehaviors.Quantity = $distConfig.CacheBehaviors.Items.Count

# Salvar configuração
$distConfig | ConvertTo-Json -Depth 10 | Out-File "updated-config.json" -Encoding ASCII

# Aplicar atualização
aws cloudfront update-distribution --id $DistributionId --distribution-config file://updated-config.json --if-match $etag

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Cache behavior para dev-cloud adicionado!" -ForegroundColor Green
    Remove-Item config.json, "updated-config.json" -ErrorAction SilentlyContinue
} else {
    Write-Host "❌ Erro ao atualizar CDN" -ForegroundColor Red
}