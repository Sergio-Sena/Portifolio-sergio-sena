@echo off
echo ========================================
echo LIMPEZA DO PROJETO PARA DEPLOY
echo ========================================

REM Remover arquivos do workspace remoto
echo Removendo arquivos do workspace...
del /f /q server.js 2>nul
del /f /q totp.js 2>nul
del /f /q setup-google-auth.js 2>nul
del /f /q start-workspace.js 2>nul
del /f /q start-workspace.bat 2>nul
del /f /q start-tunnel.js 2>nul
del /f /q start-simple.bat 2>nul
del /f /q aws-tunnel-solution.js 2>nul
del /f /q secure-transfer.js 2>nul
del /f /q workspace-access.js 2>nul
del /f /q google-auth-setup.html 2>nul
del /f /q tunnel-url.txt 2>nul

REM Remover scripts de deploy
echo Removendo scripts de deploy...
del /f /q deploy*.ps1 2>nul
del /f /q deploy*.bat 2>nul
del /f /q get-tunnel-url.js 2>nul

REM Remover arquivos de teste
echo Removendo arquivos de teste...
del /f /q test-*.js 2>nul
del /f /q quick-test.js 2>nul

REM Remover documentação técnica
echo Removendo documentação técnica...
del /f /q *.md 2>nul
del /f /q WORKSPACE-README.md 2>nul
del /f /q IMPLEMENTACAO-FLUXO-AWS.md 2>nul
del /f /q PLANO-IMPLEMENTACAO-WORKSPACE.md 2>nul
del /f /q "Arquitetura da Solução de Acesso Remoto Seguro.md" 2>nul
del /f /q deploy-setup.md 2>nul
del /f /q remote-access-setup.md 2>nul

REM Remover Node.js
echo Removendo arquivos Node.js...
del /f /q package.json 2>nul
del /f /q package-lock.json 2>nul
rmdir /s /q node_modules 2>nul

REM Remover diretórios AWS e GitHub Actions
echo Removendo configurações AWS e CI/CD...
rmdir /s /q aws 2>nul
rmdir /s /q .github 2>nul

REM Remover uploads e arquivos temporários
echo Removendo uploads e temporários...
rmdir /s /q uploads 2>nul
del /f /q temp-* 2>nul

REM Remover arquivos duplicados na raiz
echo Removendo arquivos duplicados...
del /f /q error.html 2>nul

REM Limpar JavaScript desnecessário
echo Removendo JavaScript do workspace...
del /f /q js\workspace-access.js 2>nul
del /f /q js\workspace-simple.js 2>nul

REM Reorganizar estrutura final
echo Reorganizando estrutura...

REM Criar estrutura limpa
if not exist "public" mkdir public
if not exist "assets" mkdir assets
if not exist "assets\images" mkdir assets\images
if not exist "assets\icons" mkdir assets\icons

REM Mover arquivos HTML para public se necessário
if exist "index.html" (
    echo Arquivos HTML já estão na raiz - OK
)

echo ========================================
echo LIMPEZA CONCLUÍDA!
echo ========================================
echo.
echo Estrutura final do projeto:
echo - index.html (página principal)
echo - certificates.html (certificações)  
echo - project-details.html (detalhes dos projetos)
echo - css/ (estilos)
echo - js/ (scripts)
echo - data/ (dados dos projetos)
echo - assets/ (imagens e ícones)
echo - src/ (recursos adicionais)
echo.
echo Projeto pronto para deploy!
echo.
pause