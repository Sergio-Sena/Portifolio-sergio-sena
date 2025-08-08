@echo off
echo ========================================
echo SINCRONIZANDO PORTFOLIO LIMPO
echo ========================================

set BUCKET=dev-cloud.sstechnologies-cloud.com

echo Sincronizando arquivos HTML...
aws s3 sync . s3://%BUCKET% --include "*.html" --exclude "clean-*" --exclude "deploy-*" --cache-control "public, max-age=3600"

echo Sincronizando CSS...
aws s3 sync ./css s3://%BUCKET%/css --cache-control "public, max-age=86400"

echo Sincronizando JavaScript...
aws s3 sync ./js s3://%BUCKET%/js --cache-control "public, max-age=86400"

echo Sincronizando dados...
aws s3 sync ./data s3://%BUCKET%/data --cache-control "public, max-age=3600"

echo Sincronizando assets...
aws s3 sync ./assets s3://%BUCKET%/assets --cache-control "public, max-age=86400"

echo Sincronizando recursos do portfolio...
aws s3 sync ./src s3://%BUCKET%/src --cache-control "public, max-age=86400"

echo Sincronizando arquivos de SEO...
aws s3 cp ./robots.txt s3://%BUCKET%/robots.txt --cache-control "public, max-age=86400"
aws s3 cp ./sitemap.xml s3://%BUCKET%/sitemap.xml --cache-control "public, max-age=86400"

echo ========================================
echo DEPLOY CONCLUIDO COM SUCESSO!
echo ========================================
echo.
echo Portfolio disponivel em:
echo https://%BUCKET%
echo.
pause