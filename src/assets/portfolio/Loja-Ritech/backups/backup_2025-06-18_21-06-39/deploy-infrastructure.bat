@echo off
echo ========================================
echo 🏗️  RITECH - DEPLOY INFRAESTRUTURA AWS
echo ========================================
echo.

REM Configurações
set STACK_NAME=ritech-fechaduras-stack
set TEMPLATE_FILE=cloudformation-template.yaml
set REGION=us-east-1
set DOMAIN_NAME=ritechfechaduras.com.br
set BUCKET_NAME=ritech-fechaduras-site-2024

echo 📋 Configurações da Stack:
echo    Nome: %STACK_NAME%
echo    Região: %REGION%
echo    Domínio: %DOMAIN_NAME%
echo    Bucket: %BUCKET_NAME%
echo.

REM Verificar se AWS CLI está configurado
aws sts get-caller-identity >nul 2>&1
if errorlevel 1 (
    echo ❌ AWS CLI não configurado. Execute:
    echo aws configure
    pause
    exit /b 1
)

echo 🔍 Verificando se stack já existe...
aws cloudformation describe-stacks --stack-name %STACK_NAME% --region %REGION% >nul 2>&1
if errorlevel 1 (
    echo 🆕 Criando nova stack...
    set ACTION=create-stack
) else (
    echo 🔄 Atualizando stack existente...
    set ACTION=update-stack
)

echo.
echo ⚠️  ATENÇÃO: Este deploy criará recursos que podem gerar custos na AWS:
echo    - S3 Bucket
echo    - CloudFront Distribution
echo    - Route 53 Hosted Zone (~$0.50/mês)
echo    - Certificate Manager (gratuito)
echo    - Lambda@Edge
echo    - WAF (opcional)
echo.

set /p CONFIRM="Deseja continuar? (s/n): "
if /i not "%CONFIRM%"=="s" (
    echo Deploy cancelado.
    pause
    exit /b 0
)

echo.
echo 🚀 Iniciando deploy da infraestrutura...

aws cloudformation %ACTION% ^
    --stack-name %STACK_NAME% ^
    --template-body file://%TEMPLATE_FILE% ^
    --parameters ^
        ParameterKey=DomainName,ParameterValue=%DOMAIN_NAME% ^
        ParameterKey=SubDomainName,ParameterValue=www.%DOMAIN_NAME% ^
        ParameterKey=BucketName,ParameterValue=%BUCKET_NAME% ^
    --capabilities CAPABILITY_IAM ^
    --region %REGION%

if errorlevel 1 (
    echo ❌ Erro no deploy da stack
    pause
    exit /b 1
)

echo ⏳ Aguardando conclusão do deploy...
echo    (Isso pode levar 15-30 minutos devido ao CloudFront e SSL)

aws cloudformation wait stack-%ACTION%-complete ^
    --stack-name %STACK_NAME% ^
    --region %REGION%

if errorlevel 1 (
    echo ❌ Deploy falhou ou foi cancelado
    echo.
    echo 📋 Verificar eventos da stack:
    echo aws cloudformation describe-stack-events --stack-name %STACK_NAME% --region %REGION%
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ INFRAESTRUTURA CRIADA COM SUCESSO!
echo ========================================

REM Obter outputs da stack
echo.
echo 📊 Informações da infraestrutura:
aws cloudformation describe-stacks ^
    --stack-name %STACK_NAME% ^
    --region %REGION% ^
    --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]" ^
    --output table

echo.
echo 🔧 Próximos passos:
echo.
echo 1. 📋 Configurar DNS no registrador do domínio:
echo    Copie os Name Servers mostrados acima
echo.
echo 2. ⏳ Aguardar propagação DNS (pode levar até 48h)
echo.
echo 3. 📤 Fazer upload dos arquivos do site:
echo    execute: deploy.bat
echo.
echo 4. 🧪 Testar o site:
echo    https://%DOMAIN_NAME%
echo.
echo 5. 📈 Monitorar no CloudWatch:
echo    Dashboard: %STACK_NAME%-monitoring
echo.

echo ========================================
echo 💰 ESTIMATIVA DE CUSTOS MENSAIS:
echo ========================================
echo S3 Storage (1GB):           $0.02
echo S3 Requests (10K):          $0.004  
echo CloudFront (10GB):          $0.85
echo Route 53 Hosted Zone:       $0.50
echo Certificate Manager:        $0.00
echo Lambda@Edge:                $0.00
echo WAF (se habilitado):        $1.00
echo ----------------------------------------
echo TOTAL ESTIMADO:             ~$1.37/mês
echo ========================================

pause