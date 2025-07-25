# Fazer backup da configuração atual
$ErrorActionPreference = "Stop"

Write-Host "Fazendo backup da configuracao atual..." -ForegroundColor Yellow

$DISTRIBUTION_ID = "E2DXHLX2VFCW6L"
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"

try {
    # Criar diretório de backup
    $backupDir = "aws/backups/$TIMESTAMP"
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    
    # Backup da distribuição CloudFront
    Write-Host "Backup CloudFront..." -ForegroundColor Cyan
    aws cloudfront get-distribution --id $DISTRIBUTION_ID > "$backupDir/cloudfront-distribution.json"
    aws cloudfront get-distribution-config --id $DISTRIBUTION_ID > "$backupDir/cloudfront-config.json"
    
    # Backup das configurações DNS (se existir)
    Write-Host "Backup DNS..." -ForegroundColor Cyan
    aws route53 list-hosted-zones > "$backupDir/hosted-zones.json"
    
    Write-Host "Backup salvo em: $backupDir" -ForegroundColor Green
    
} catch {
    Write-Host "Erro no backup: $_" -ForegroundColor Red
    exit 1
}