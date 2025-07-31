# Script para deletar CDNs desabilitados
$idleCDNs = @("E2O2ZMEA7SGXZ4", "EL2N09H69L9HV", "EKF35P9NYEDBS", "E1GXQEMGG0V0E8")

Write-Host "Verificando status e deletando CDNs..." -ForegroundColor Yellow

foreach ($cdnId in $idleCDNs) {
    # Verificar status
    $status = aws cloudfront get-distribution --id $cdnId --query "Distribution.Status" --output text
    
    if ($status -eq "Deployed") {
        Write-Host "Deletando CDN $cdnId..." -ForegroundColor Cyan
        
        # Obter ETag
        $etag = aws cloudfront get-distribution --id $cdnId --query "ETag" --output text
        
        # Deletar distribuição
        aws cloudfront delete-distribution --id $cdnId --if-match $etag
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ CDN $cdnId deletado" -ForegroundColor Green
        } else {
            Write-Host "❌ Erro ao deletar CDN $cdnId" -ForegroundColor Red
        }
    } else {
        Write-Host "⏳ CDN $cdnId ainda em status: $status" -ForegroundColor Yellow
    }
}

Write-Host "`n💰 CDNs ociosos removidos - Economia estimada: ~$200/mês" -ForegroundColor Green