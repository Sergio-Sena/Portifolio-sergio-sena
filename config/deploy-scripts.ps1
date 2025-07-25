# Scripts de Deploy - Portfolio Sergio Sena
# Versão Estável - Main Branch

# Configurações
$PORTFOLIO_BUCKET = "portfolio-sergio-sena"
$RITECH_BUCKET = "ritech-fechaduras-site"
$PORTFOLIO_CLOUDFRONT = "E2O2ZMEA7SGXZ4"
$RITECH_CLOUDFRONT = "EL2N09H69L9HV"

# Deploy Portfolio
function Deploy-Portfolio {
    Write-Host "Deploying Portfolio..." -ForegroundColor Cyan
    aws s3 sync ./public/ s3://$PORTFOLIO_BUCKET/public/ --delete
    aws s3 sync ./src/ s3://$PORTFOLIO_BUCKET/src/ --delete
    aws cloudfront create-invalidation --distribution-id $PORTFOLIO_CLOUDFRONT --paths "/*"
    Write-Host "Portfolio deployed successfully!" -ForegroundColor Green
}

# Deploy Ritech
function Deploy-Ritech {
    Write-Host "Deploying Ritech..." -ForegroundColor Cyan
    # Assumindo que arquivos do Ritech estão em uma pasta específica
    aws s3 sync ./ritech/ s3://$RITECH_BUCKET/ --delete
    aws cloudfront create-invalidation --distribution-id $RITECH_CLOUDFRONT --paths "/*"
    Write-Host "Ritech deployed successfully!" -ForegroundColor Green
}

# Deploy completo
function Deploy-All {
    Deploy-Portfolio
    Deploy-Ritech
    Write-Host "All deployments completed!" -ForegroundColor Green
}

# Backup
function Backup-Current {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    Write-Host "Creating backup: backup-$timestamp" -ForegroundColor Yellow
    
    aws s3 sync s3://$PORTFOLIO_BUCKET/ ./backups/portfolio-$timestamp/ 
    aws s3 sync s3://$RITECH_BUCKET/ ./backups/ritech-$timestamp/
    
    Write-Host "Backup completed!" -ForegroundColor Green
}