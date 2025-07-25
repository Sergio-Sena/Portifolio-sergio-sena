# GUIA DE CONFIGURAÇÃO DNS

## 📋 CONFIGURAÇÃO NECESSÁRIA

### **CloudFront Domain:** `d1woz9qgfwb4as.cloudfront.net`

### **DNS Records a criar:**

```
Tipo: CNAME
Nome: sstechnologies-cloud.com
Valor: d1woz9qgfwb4as.cloudfront.net

Tipo: CNAME  
Nome: ritech.sstechnologies-cloud.com
Valor: d1woz9qgfwb4as.cloudfront.net
```

## 🔧 COMO CONFIGURAR:

### **1. No seu provedor de DNS:**
- Acesse o painel do seu provedor de domínio
- Vá para configurações DNS/Zone File
- Adicione os 2 registros CNAME acima

### **2. Tempo de propagação:**
- 5-30 minutos para propagação completa

### **3. URLs finais:**
- **Portfolio:** https://sstechnologies-cloud.com
- **Ritech:** https://ritech.sstechnologies-cloud.com

## ✅ TESTE APÓS CONFIGURAÇÃO:
Execute: `.\test-final.ps1`