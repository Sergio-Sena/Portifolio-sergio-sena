# Script para remover CDNs ociosos
$idleCDNs = @(
    @{Id="E2O2ZMEA7SGXZ4"; Name="Portfolio Dedicado"},
    @{Id="EL2N09H69L9HV"; Name="Ritech Dedicado"},
    @{Id="EKF35P9NYEDBS"; Name="AWS Services Dedicado"},
    @{Id="E1GXQEMGG0V0E8"; Name="SS Gestão Dedicado"}
)

Write-Host "Removendo CDNs ociosos..." -ForegroundColor Yellow

foreach ($cdn in $idleCDNs) {
    Write-Host "Desabilitando $($cdn.Name) ($($cdn.Id))..." -ForegroundColor Cyan
    
    # Baixar configuração
    aws cloudfront get-distribution-config --id $cdn.Id --output json > "config-$($cdn.Id).json"
    
    $config = Get-Content "config-$($cdn.Id).json" | ConvertFrom-Json
    $etag = $config.ETag
    $distConfig = $config.DistributionConfig
    
    # Desabilitar distribuição
    $distConfig.Enabled = $false
    
    # Salvar configuração
    $distConfig | ConvertTo-Json -Depth 10 | Out-File "disabled-$($cdn.Id).json" -Encoding ASCII
    
    # Aplicar desabilitação
    aws cloudfront update-distribution --id $cdn.Id --distribution-config "file://disabled-$($cdn.Id).json" --if-match $etag
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $($cdn.Name) desabilitado" -ForegroundColor Green
    } else {
        Write-Host "❌ Erro ao desabilitar $($cdn.Name)" -ForegroundColor Red
    }
    
    # Limpar arquivos temporários
    Remove-Item "config-$($cdn.Id).json", "disabled-$($cdn.Id).json" -ErrorAction SilentlyContinue
}

Write-Host "`n⏳ Aguarde 15-20 minutos para desabilitação completa..." -ForegroundColor Yellow
Write-Host "Depois execute: .\config\delete-disabled-cdns.ps1" -ForegroundColor Cyan