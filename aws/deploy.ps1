param (
    [string]$BucketName,
    [string]$DistributionId
)

# Verificar se os parâmetros foram fornecidos
if (-not $BucketName) {
    Write-Host "Por favor, forneça o nome do bucket S3. Exemplo: .\deploy.ps1 -BucketName seu-bucket-s3 -DistributionId sua-distribuicao-cloudfront"
    exit 1
}

# Caminho para a pasta do projeto
$ProjectPath = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

# Sincronizar arquivos com o bucket S3
Write-Host "Sincronizando arquivos com o bucket S3: $BucketName"
aws s3 sync $ProjectPath s3://$BucketName --exclude "aws/*" --exclude ".git/*" --exclude "*.ps1" --exclude "*.yaml" --delete

# Invalidar o cache do CloudFront se o ID da distribuição foi fornecido
if ($DistributionId) {
    Write-Host "Invalidando cache do CloudFront para a distribuição: $DistributionId"
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
}

Write-Host "Implantação concluída com sucesso!"