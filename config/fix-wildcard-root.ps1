# Script para adicionar DefaultRootObject ao CDN wildcard
param(
    [string]$DistributionId = "E3FUU8LKMW773I"
)

Write-Host "Configurando DefaultRootObject no CDN wildcard..." -ForegroundColor Yellow

# Baixar configuração atual
aws cloudfront get-distribution-config --id $DistributionId --output json > config.json

$config = Get-Content config.json | ConvertFrom-Json
$etag = $config.ETag
$distConfig = $config.DistributionConfig

# Adicionar DefaultRootObject
$distConfig.DefaultRootObject = "index.html"

# Salvar configuração
$distConfig | ConvertTo-Json -Depth 10 | Out-File "updated-config.json" -Encoding ASCII

# Aplicar atualização
aws cloudfront update-distribution --id $DistributionId --distribution-config file://updated-config.json --if-match $etag

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ DefaultRootObject configurado!" -ForegroundColor Green
    Write-Host "Aguarde alguns minutos para propagação..." -ForegroundColor Yellow
    Remove-Item config.json, "updated-config.json" -ErrorAction SilentlyContinue
} else {
    Write-Host "❌ Erro ao atualizar CDN" -ForegroundColor Red
}