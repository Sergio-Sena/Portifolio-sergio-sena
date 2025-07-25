# Guia de Deploy por Fases

## 🎯 Execução Controlada

### 1. **Verificação Inicial**
```powershell
./deploy-master.ps1 -CheckOnly
```
- Verifica configuração atual
- Lista aliases existentes
- Confirma status do bucket S3

### 2. **Backup de Segurança**
```powershell
./deploy-master.ps1 -BackupOnly
```
- Salva configuração atual em `aws/backups/`
- Permite rollback se necessário

### 3. **Execução por Fases**

#### Fase 1 apenas (CloudFront):
```powershell
./deploy-master.ps1 -StartPhase 1 -EndPhase 1
```

#### Fase 2 apenas (Upload S3):
```powershell
./deploy-master.ps1 -StartPhase 2 -EndPhase 2
```

#### Fase 3 apenas (Teste):
```powershell
./deploy-master.ps1 -StartPhase 3 -EndPhase 3
```

#### Deploy completo:
```powershell
./deploy-master.ps1
```

## 🔍 O que cada fase faz:

### **FASE 1: CloudFront**
- ✅ Verifica se origem S3-portfolio existe
- ➕ Adiciona origem se necessário
- ⚙️ Configura cache behavior para `/portfolio/*`
- ⏳ Aguarda deploy do CloudFront

### **FASE 2: Upload S3**
- 📁 Sync `public/` → `s3://portfolio-sergio-sena/portfolio/`
- 📁 Sync `src/` → `s3://portfolio-sergio-sena/portfolio/src/`
- ✅ Verifica arquivos enviados

### **FASE 3: Teste**
- 🔄 Invalida cache CloudFront
- 🌐 Testa URLs de acesso
- ✅ Confirma funcionamento

## 🚨 Em caso de erro:
```powershell
# Restaurar backup (se necessário)
aws cloudfront update-distribution --id E2DXHLX2VFCW6L --distribution-config file://aws/backups/[TIMESTAMP]/cloudfront-config.json
```