# FASE 1: Adicionar origem S3-portfolio ao CloudFront (se não existir)
$ErrorActionPreference = "Stop"

Write-Host "🚀 FASE 1: Configurando origem S3-portfolio..." -ForegroundColor Green

$DISTRIBUTION_ID = "E2DXHLX2VFCW6L"

try {
    # Verificar configuração atual
    Write-Host "🔍 Verificando configuração atual..." -ForegroundColor Yellow
    $currentConfig = aws cloudfront get-distribution-config --id $DISTRIBUTION_ID | ConvertFrom-Json
    
    # Verificar se S3-portfolio já existe
    $portfolioOriginExists = $currentConfig.DistributionConfig.Origins.Items | Where-Object { $_.Id -eq "S3-portfolio" }
    
    if ($portfolioOriginExists) {
        Write-Host "✅ Origem S3-portfolio já existe" -ForegroundColor Green
        Write-Host "   Domain: $($portfolioOriginExists.DomainName)" -ForegroundColor Gray
    } else {
        Write-Host "➕ Adicionando origem S3-portfolio..." -ForegroundColor Yellow
        
        # Ler configuração atualizada
        $newConfig = Get-Content "aws/update-cloudfront.json" | ConvertFrom-Json
        
        # Aplicar mudanças
        $configJson = $newConfig | ConvertTo-Json -Depth 10
        $configJson | Out-File -FilePath "temp-config.json" -Encoding UTF8
        
        aws cloudfront update-distribution --id $DISTRIBUTION_ID --if-match $currentConfig.ETag --distribution-config file://temp-config.json
        
        Write-Host "⏳ Aguardando deploy..." -ForegroundColor Yellow
        aws cloudfront wait distribution-deployed --id $DISTRIBUTION_ID
        
        Remove-Item "temp-config.json" -Force
        Write-Host "✅ Origem S3-portfolio adicionada!" -ForegroundColor Green
    }
    
} catch {
    Write-Host "❌ Erro na Fase 1: $_" -ForegroundColor Red
    exit 1
}