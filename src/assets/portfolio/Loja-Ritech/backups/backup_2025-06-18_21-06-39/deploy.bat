@echo off
echo ========================================
echo 🚀 RITECH FECHADURAS - DEPLOY SERVERLESS
echo ========================================
echo.

REM Verificar se AWS CLI está instalado
aws --version >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI não encontrado. Instale primeiro:
    echo https://aws.amazon.com/cli/
    pause
    exit /b 1
)

REM Configurações
set BUCKET_NAME=ritech-fechaduras-site
set DISTRIBUTION_ID=E1234567890ABC
set REGION=us-east-1

echo 📋 Configurações:
echo    Bucket: %BUCKET_NAME%
echo    Região: %REGION%
echo    Distribution: %DISTRIBUTION_ID%
echo.

REM Verificar se bucket existe
echo 🔍 Verificando bucket S3...
aws s3 ls s3://%BUCKET_NAME% >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Bucket não encontrado. Criando...
    aws s3 mb s3://%BUCKET_NAME% --region %REGION%
    if errorlevel 1 (
        echo ❌ Erro ao criar bucket
        pause
        exit /b 1
    )
    echo ✅ Bucket criado com sucesso
)

REM Habilitar website hosting
echo 🌐 Configurando website hosting...
aws s3 website s3://%BUCKET_NAME% --index-document Index.html --error-document error.html

REM Upload dos arquivos com cache headers otimizados
echo 📤 Fazendo upload dos arquivos...

REM HTML files (cache menor)
aws s3 cp Index.html s3://%BUCKET_NAME%/ --cache-control "public, max-age=3600" --content-type "text/html"
aws s3 cp Precificacao.html s3://%BUCKET_NAME%/ --cache-control "public, max-age=3600" --content-type "text/html"
aws s3 cp error.html s3://%BUCKET_NAME%/ --cache-control "public, max-age=3600" --content-type "text/html"
aws s3 cp Termos_privacidade.html s3://%BUCKET_NAME%/ --cache-control "public, max-age=3600" --content-type "text/html"

REM CSS files
aws s3 cp styles.css s3://%BUCKET_NAME%/ --cache-control "public, max-age=31536000" --content-type "text/css"

REM JavaScript files
aws s3 sync js/ s3://%BUCKET_NAME%/js/ --cache-control "public, max-age=31536000" --content-type "application/javascript"

REM Images (cache longo)
aws s3 sync Images/ s3://%BUCKET_NAME%/Images/ --cache-control "public, max-age=31536000"

echo ✅ Upload concluído!

REM Invalidar CloudFront (opcional)
echo.
set /p INVALIDATE="🔄 Invalidar cache do CloudFront? (s/n): "
if /i "%INVALIDATE%"=="s" (
    echo Invalidando cache...
    aws cloudfront create-invalidation --distribution-id %DISTRIBUTION_ID% --paths "/*"
    if errorlevel 1 (
        echo ⚠️  Erro ao invalidar cache (verifique DISTRIBUTION_ID)
    ) else (
        echo ✅ Cache invalidado com sucesso
    )
)

echo.
echo ========================================
echo ✅ DEPLOY CONCLUÍDO COM SUCESSO!
echo ========================================
echo.
echo 🌐 URLs de acesso:
echo    S3 Website: http://%BUCKET_NAME%.s3-website-%REGION%.amazonaws.com
echo    CloudFront: https://%DISTRIBUTION_ID%.cloudfront.net
echo.
echo 📊 Para monitorar:
echo    aws s3 ls s3://%BUCKET_NAME% --recursive --human-readable
echo    aws cloudfront get-distribution --id %DISTRIBUTION_ID%
echo.
pause