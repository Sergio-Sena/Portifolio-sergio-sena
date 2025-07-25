# Verificar configuração atual da AWS
$ErrorActionPreference = "Stop"

Write-Host "Verificando configuracao atual..." -ForegroundColor Yellow

$DISTRIBUTION_ID = "E2DXHLX2VFCW6L"
$BUCKET_NAME = "portfolio-sergio-sena"

try {
    # 1. Verificar CloudFront Distribution
    Write-Host "`nCloudFront Distribution:" -ForegroundColor Cyan
    $distribution = aws cloudfront get-distribution --id $DISTRIBUTION_ID | ConvertFrom-Json
    
    Write-Host "  Status: $($distribution.Distribution.Status)" -ForegroundColor Green
    Write-Host "  Aliases atuais:" -ForegroundColor White
    foreach ($alias in $distribution.Distribution.DistributionConfig.Aliases.Items) {
        Write-Host "    - $alias" -ForegroundColor Gray
    }
    
    # 2. Verificar Origins
    Write-Host "`nOrigins configuradas:" -ForegroundColor Cyan
    foreach ($origin in $distribution.Distribution.DistributionConfig.Origins.Items) {
        Write-Host "  ID: $($origin.Id)" -ForegroundColor White
        Write-Host "    Domain: $($origin.DomainName)" -ForegroundColor Gray
    }
    
    # 3. Verificar Cache Behaviors
    Write-Host "`nCache Behaviors:" -ForegroundColor Cyan
    Write-Host "  Default: $($distribution.Distribution.DistributionConfig.DefaultCacheBehavior.TargetOriginId)" -ForegroundColor White
    
    if ($distribution.Distribution.DistributionConfig.CacheBehaviors.Items) {
        foreach ($behavior in $distribution.Distribution.DistributionConfig.CacheBehaviors.Items) {
            Write-Host "  Pattern: $($behavior.PathPattern) -> $($behavior.TargetOriginId)" -ForegroundColor Gray
        }
    }
    
    # 4. Verificar S3 Bucket
    Write-Host "`nS3 Bucket:" -ForegroundColor Cyan
    $bucketExists = aws s3 ls s3://$BUCKET_NAME 2>$null
    if ($bucketExists) {
        Write-Host "  Bucket '$BUCKET_NAME' existe" -ForegroundColor Green
        
        # Verificar se ja existe conteudo em /portfolio
        $portfolioContent = aws s3 ls s3://$BUCKET_NAME/portfolio/ 2>$null
        if ($portfolioContent) {
            Write-Host "  Conteudo em /portfolio/ ja existe" -ForegroundColor Yellow
        } else {
            Write-Host "  Pasta /portfolio/ nao existe ainda" -ForegroundColor Gray
        }
    } else {
        Write-Host "  Bucket '$BUCKET_NAME' nao encontrado" -ForegroundColor Red
    }
    
    # 5. Verificar DNS
    Write-Host "`nVerificacao DNS:" -ForegroundColor Cyan
    $dnsCheck = nslookup dev-cloud.sstechnologies-cloud.com 2>$null
    if ($dnsCheck) {
        Write-Host "  dev-cloud.sstechnologies-cloud.com resolve" -ForegroundColor Green
    } else {
        Write-Host "  dev-cloud.sstechnologies-cloud.com nao resolve" -ForegroundColor Red
    }
    
    Write-Host "`nVerificacao concluida!" -ForegroundColor Green
    
} catch {
    Write-Host "Erro na verificacao: $_" -ForegroundColor Red
    exit 1
}