# Teste simples de arquivos
Write-Host "Verificando arquivos essenciais..." -ForegroundColor Green

$files = @(
    "public\index.html",
    "public\certificates.html", 
    "public\project-details.html",
    "public\error.html",
    "src\js\translations.js"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "OK: $file" -ForegroundColor Green
    } else {
        Write-Host "ERRO: $file nao encontrado" -ForegroundColor Red
    }
}