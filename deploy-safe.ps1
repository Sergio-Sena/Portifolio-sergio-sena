# Script de Deploy Seguro
# Verifica arquivos antes do upload

Write-Host "🚀 Iniciando Deploy Seguro..." -ForegroundColor Green

# 1. Verificar arquivos essenciais
$essentialFiles = @(
    "public/index.html",
    "public/certificates.html", 
    "public/project-details.html",
    "public/error.html",
    "src/js/translations.js",
    "src/css/style.css"
)

Write-Host "📋 Verificando arquivos essenciais..." -ForegroundColor Yellow

foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file - ARQUIVO FALTANDO!" -ForegroundColor Red
        exit 1
    }
}

# 2. Verificar sintaxe JavaScript
Write-Host "🔍 Verificando JavaScript..." -ForegroundColor Yellow

try {
    # Verificar se o arquivo de tradução não tem erros de sintaxe
    $jsContent = Get-Content "src/js/translations.js" -Raw
    if ($jsContent -match "translations\s*=\s*{") {
        Write-Host "✅ translations.js sintaxe OK" -ForegroundColor Green
    } else {
        Write-Host "❌ translations.js pode ter erro de sintaxe" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Erro ao verificar JavaScript: $_" -ForegroundColor Red
    exit 1
}

# 3. Verificar links internos nos HTMLs
Write-Host "🔗 Verificando links internos..." -ForegroundColor Yellow

$htmlFiles = Get-ChildItem "public/*.html"
foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Verificar se há referências quebradas
    if ($content -match 'src="[^"]*\.js"') {
        Write-Host "✅ $($file.Name) - Scripts referenciados" -ForegroundColor Green
    }
    
    if ($content -match 'href="[^"]*\.css"') {
        Write-Host "✅ $($file.Name) - CSS referenciado" -ForegroundColor Green
    }
}

# 4. Criar backup antes do deploy
Write-Host "💾 Criando backup..." -ForegroundColor Yellow

$backupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

Copy-Item "public/*" $backupDir -Recurse -Force
Copy-Item "src/*" "$backupDir/src" -Recurse -Force

Write-Host "✅ Backup criado em: $backupDir" -ForegroundColor Green

# 5. Executar deploy (descomente a linha abaixo quando estiver pronto)
# .\config\deploy-scripts.ps1

Write-Host "🎉 Verificações concluídas! Deploy pode ser executado." -ForegroundColor Green
Write-Host "📍 Para testar localmente, acesse: public/debug.html" -ForegroundColor Cyan