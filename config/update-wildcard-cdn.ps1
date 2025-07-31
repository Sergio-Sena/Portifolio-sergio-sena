# Script para atualizar origem do CDN wildcard
param(
    [string]$DistributionId = "E3FUU8LKMW773I",
    [string]$NewOrigin = "portfolio-sergio-sena.s3.us-east-1.amazonaws.com"
)

Write-Host "Atualizando CDN wildcard $DistributionId..." -ForegroundColor Yellow

# 1. Baixar configuração atual
Write-Host "Baixando configuração atual..." -ForegroundColor Cyan
$configFile = "wildcard-config.json"
aws cloudfront get-distribution-config --id $DistributionId --output json > $configFile

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erro ao baixar configuração do CDN" -ForegroundColor Red
    exit 1
}

# 2. Ler e modificar configuração
$config = Get-Content $configFile | ConvertFrom-Json
$etag = $config.ETag
$distConfig = $config.DistributionConfig

# Atualizar origem
$distConfig.Origins.Items[0].DomainName = $NewOrigin
$distConfig.Origins.Items[0].Id = "portfolio-origin"

# Salvar configuração modificada sem BOM
$distConfig | ConvertTo-Json -Depth 10 | Out-File "updated-config.json" -Encoding ASCII

# 3. Aplicar atualização
Write-Host "Aplicando atualização..." -ForegroundColor Cyan
aws cloudfront update-distribution --id $DistributionId --distribution-config file://updated-config.json --if-match $etag

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ CDN wildcard atualizado com sucesso!" -ForegroundColor Green
    Write-Host "Aguarde alguns minutos para propagação..." -ForegroundColor Yellow
    
    # Limpar arquivos temporários
    Remove-Item $configFile, "updated-config.json" -ErrorAction SilentlyContinue
} else {
    Write-Host "❌ Erro ao atualizar CDN" -ForegroundColor Red
    exit 1
}