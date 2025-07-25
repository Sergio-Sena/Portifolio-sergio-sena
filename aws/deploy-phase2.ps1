# FASE 2: Upload inicial dos arquivos para S3
$ErrorActionPreference = "Stop"

Write-Host "FASE 2: Upload dos arquivos para S3..." -ForegroundColor Green

$BUCKET_NAME = "portfolio-sergio-sena"

try {
    # Verificar se bucket existe
    Write-Host "Verificando bucket S3..." -ForegroundColor Yellow
    $bucketExists = aws s3 ls s3://$BUCKET_NAME 2>$null
    
    if (-not $bucketExists) {
        Write-Host "Bucket $BUCKET_NAME nao encontrado" -ForegroundColor Red
        exit 1
    }
    
    # Upload dos arquivos
    Write-Host "Fazendo upload dos arquivos..." -ForegroundColor Yellow
    
    # Upload public/ para /portfolio/
    aws s3 sync public/ s3://$BUCKET_NAME/portfolio --delete --exclude "*.git*"
    
    # Upload src/ para /portfolio/src/
    aws s3 sync src/ s3://$BUCKET_NAME/portfolio/src --delete --exclude "*.git*"
    
    # Verificar upload
    Write-Host "Verificando arquivos enviados..." -ForegroundColor Yellow
    $portfolioFiles = aws s3 ls s3://$BUCKET_NAME/portfolio/ --recursive
    
    if ($portfolioFiles) {
        Write-Host "Arquivos enviados com sucesso!" -ForegroundColor Green
        Write-Host "Arquivos no S3:" -ForegroundColor Cyan
        $portfolioFiles | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
    } else {
        Write-Host "Nenhum arquivo encontrado no S3" -ForegroundColor Red
        exit 1
    }
    
} catch {
    Write-Host "Erro na Fase 2: $_" -ForegroundColor Red
    exit 1
}