# FASE 3: Teste e validação
$ErrorActionPreference = "Stop"

Write-Host "FASE 3: Teste e validacao..." -ForegroundColor Green

$DISTRIBUTION_ID = "E2DXHLX2VFCW6L"

try {
    # Invalidar cache
    Write-Host "Invalidando cache do CloudFront..." -ForegroundColor Yellow
    $invalidation = aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/portfolio/*" | ConvertFrom-Json
    
    Write-Host "Aguardando invalidacao..." -ForegroundColor Yellow
    aws cloudfront wait invalidation-completed --distribution-id $DISTRIBUTION_ID --id $invalidation.Invalidation.Id
    
    # Obter URL do CloudFront
    Write-Host "Obtendo URL do CloudFront..." -ForegroundColor Yellow
    $distribution = aws cloudfront get-distribution --id $DISTRIBUTION_ID | ConvertFrom-Json
    $cloudfrontUrl = $distribution.Distribution.DomainName
    
    # Teste de conectividade
    Write-Host "Testando conectividade..." -ForegroundColor Yellow
    
    $testUrls = @(
        "https://$cloudfrontUrl/portfolio/",
        "https://$cloudfrontUrl/portfolio/index.html"
    )
    
    # Verificar se dev-cloud já resolve
    $dnsCheck = nslookup dev-cloud.sstechnologies-cloud.com 2>$null
    if ($dnsCheck) {
        $testUrls += "https://dev-cloud.sstechnologies-cloud.com/"
    }
    
    foreach ($url in $testUrls) {
        try {
            $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10
            Write-Host "  OK $url - Status: $($response.StatusCode)" -ForegroundColor Green
        } catch {
            Write-Host "  ERRO $url - Erro: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    Write-Host "`nFase 3 concluida!" -ForegroundColor Green
    Write-Host "URLs de teste:" -ForegroundColor Cyan
    foreach ($url in $testUrls) {
        Write-Host "   $url" -ForegroundColor Gray
    }
    
} catch {
    Write-Host "Erro na Fase 3: $_" -ForegroundColor Red
    exit 1
}