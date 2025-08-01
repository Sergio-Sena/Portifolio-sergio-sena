require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');
const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8000', '*'],
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'access_key', 'secret_key'],
    exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de autenticação
app.post('/auth', async (req, res) => {
    const { access_key, secret_key } = req.body;

    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas' 
        });
    }

    try {
        // Configurar AWS SDK com as credenciais fornecidas
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1' // Região padrão, pode ser alterada conforme necessário
        });

        // Tentar listar buckets para verificar se as credenciais são válidas
        await s3.listBuckets().promise();

        // Se não lançar exceção, as credenciais são válidas
        return res.status(200).json({
            success: true,
            message: 'Autenticação bem-sucedida',
            redirect: 'aws-services.html'
        });
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.status(401).json({
            success: false,
            message: 'Credenciais inválidas',
            error: error.message
        });
    }
});

// Rota para listar buckets
app.get('/buckets', async (req, res) => {
    const access_key = req.headers['access_key'];
    const secret_key = req.headers['secret_key'];
    
    console.log('Headers recebidos:', req.headers);
    console.log('Credenciais recebidas:', { access_key: access_key ? access_key.substring(0, 3) + '...' : 'undefined', secret_key: secret_key ? '***' : 'undefined' });

    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas nos headers' 
        });
    }

    try {
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });

        const data = await s3.listBuckets().promise();
        
        return res.status(200).json({
            success: true,
            buckets: data.Buckets
        });
    } catch (error) {
        console.error('Erro ao listar buckets:', error);
        return res.status(500).json({
            success: false,
            message: 'Erro ao listar buckets',
            error: error.message
        });
    }
});

// Rota para listar objetos de um bucket
app.get('/objects/:bucket', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket } = req.params;
    const { prefix = '' } = req.query;

    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas nos headers' 
        });
    }

    try {
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });

        const data = await s3.listObjectsV2({ 
            Bucket: bucket,
            Prefix: prefix,
            Delimiter: '/'  // Usar delimitador para simular navegação por pastas
        }).promise();
        
        return res.status(200).json({
            success: true,
            objects: data.Contents,
            prefixes: data.CommonPrefixes
        });
    } catch (error) {
        console.error(`Erro ao listar objetos do bucket ${bucket}:`, error);
        return res.status(500).json({
            success: false,
            message: `Erro ao listar objetos do bucket ${bucket}`,
            error: error.message
        });
    }
});

// Rota para obter o tamanho total do bucket
app.get('/bucket-size/:bucket', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket } = req.params;

    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas nos headers' 
        });
    }

    try {
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });

        // Listar todos os objetos no bucket (sem delimiter)
        const data = await s3.listObjectsV2({ 
            Bucket: bucket,
            MaxKeys: 1000 // Limitar para evitar timeouts
        }).promise();
        
        // Calcular tamanho total
        let totalSize = 0;
        let totalObjects = 0;
        
        if (data.Contents) {
            data.Contents.forEach(obj => {
                totalSize += obj.Size || 0;
                totalObjects++;
            });
        }
        
        // Verificar se há mais objetos (paginação)
        let isTruncated = data.IsTruncated;
        let nextContinuationToken = data.NextContinuationToken;
        
        // Limitar a 5 páginas para evitar timeouts
        let pageCount = 1;
        const maxPages = 5;
        
        while (isTruncated && pageCount < maxPages) {
            const nextData = await s3.listObjectsV2({
                Bucket: bucket,
                MaxKeys: 1000,
                ContinuationToken: nextContinuationToken
            }).promise();
            
            if (nextData.Contents) {
                nextData.Contents.forEach(obj => {
                    totalSize += obj.Size || 0;
                    totalObjects++;
                });
            }
            
            isTruncated = nextData.IsTruncated;
            nextContinuationToken = nextData.NextContinuationToken;
            pageCount++;
        }
        
        return res.status(200).json({
            success: true,
            totalSize,
            totalObjects,
            isTruncated: isTruncated, // Indica se ainda há mais objetos
            formattedSize: formatBytes(totalSize)
        });
    } catch (error) {
        console.error(`Erro ao obter tamanho do bucket ${bucket}:`, error);
        return res.status(500).json({
            success: false,
            message: `Erro ao obter tamanho do bucket ${bucket}`,
            error: error.message
        });
    }
});

// Função auxiliar para formatar bytes
function formatBytes(bytes, decimals = 2) {
    if (!bytes) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Importar serviços de download
const { downloadS3Object } = require('./download-service');
const { downloadS3Folder } = require('./download-folder-service');
const path = require('path');
const fs = require('fs');

// Importar rotas para download de bucket e múltiplos objetos
const downloadRoutes = require('./routes');

// As rotas para download de bucket e múltiplos objetos foram movidas para o arquivo routes.js

// Rota para download de uma pasta (como ZIP)
app.get('/download-folder/:bucket/:prefix(*)', async (req, res) => {
    // Tentar obter credenciais dos headers ou query params
    let access_key = req.headers['access_key'];
    let secret_key = req.headers['secret_key'];
    
    // Se não estiver nos headers, tentar nos query params
    if (!access_key || !secret_key) {
        access_key = req.query.access_token;
        secret_key = req.query.secret_token;
    }
    
    const { bucket } = req.params;
    let { prefix } = req.params;
    
    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas nos headers ou query params' 
        });
    }

    try {
        // Decodificar o prefixo
        prefix = decodeURIComponent(prefix);
        
        // Garantir que o prefixo termine com uma barra
        if (!prefix.endsWith('/')) {
            prefix += '/';
        }
        
        // Fazer download da pasta como ZIP
        await downloadS3Folder(access_key, secret_key, bucket, prefix, res);
        
    } catch (error) {
        console.error(`Erro ao fazer download da pasta ${prefix}:`, error);
        // Se o cabeçalho ainda não foi enviado
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: `Erro ao fazer download da pasta`,
                error: error.message
            });
        }
    }
});

// Rota para download de um objeto
app.get('/download/:bucket/:key(*)', async (req, res) => {
    // Tentar obter credenciais dos headers ou query params
    let access_key = req.headers['access_key'];
    let secret_key = req.headers['secret_key'];
    
    // Se não estiver nos headers, tentar nos query params
    if (!access_key || !secret_key) {
        access_key = req.query.access_token;
        secret_key = req.query.secret_token;
    }
    
    const { bucket } = req.params;
    let { key } = req.params;
    
    if (!access_key || !secret_key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Credenciais não fornecidas nos headers ou query params' 
        });
    }

    try {
        // Decodificar a chave do objeto
        key = decodeURIComponent(key);
        
        // Obter o nome do arquivo da chave
        const fileName = path.basename(key);
        
        // Criar diretório de downloads se não existir
        const downloadsDir = path.join(__dirname, 'downloads');
        if (!fs.existsSync(downloadsDir)) {
            fs.mkdirSync(downloadsDir, { recursive: true });
        }
        
        // Caminho completo para o arquivo de download
        const downloadPath = path.join(downloadsDir, fileName);
        
        // Configurar cabeçalhos para download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        
        // Configurar AWS SDK com as credenciais fornecidas
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });
        
        // Criar stream do S3 diretamente para a resposta
        const s3Stream = s3.getObject({
            Bucket: bucket,
            Key: key
        }).createReadStream();
        
        // Pipe do stream do S3 para a resposta
        s3Stream.pipe(res);
        
        // Tratamento de erros
        s3Stream.on('error', (error) => {
            console.error(`Erro ao fazer download do objeto ${key}:`, error);
            // Se o cabeçalho ainda não foi enviado
            if (!res.headersSent) {
                return res.status(500).json({
                    success: false,
                    message: `Erro ao fazer download do objeto ${key}`,
                    error: error.message
                });
            }
        });
        
    } catch (error) {
        console.error(`Erro ao fazer download do objeto ${key}:`, error);
        return res.status(500).json({
            success: false,
            message: `Erro ao fazer download do objeto`,
            error: error.message
        });
    }
});

// Rota para criar bucket
app.post('/create-bucket', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket_name, region } = req.body;
    
    console.log('Criando bucket:', { bucket_name, region });
    
    if (!access_key || !secret_key || !bucket_name) {
        return res.status(400).json({ 
            success: false, 
            message: 'Parâmetros inválidos' 
        });
    }

    try {
        // Configurar o cliente S3 com as credenciais
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region || 'us-east-1'
        });
        
        // Criar o bucket - tratamento especial para us-east-1
        if (region === 'us-east-1') {
            await s3.createBucket({
                Bucket: bucket_name
            }).promise();
        } else {
            await s3.createBucket({
                Bucket: bucket_name,
                CreateBucketConfiguration: {
                    LocationConstraint: region
                }
            }).promise();
        }
        
        res.json({ success: true, message: 'Bucket criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar bucket:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Configurar multer para upload de arquivos
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// Importar serviço de upload multipart
const { processLargeFile } = require('./multipart-upload-service');

// Rota para upload de arquivos
app.post('/upload/:bucket', upload.array('files'), async (req, res) => {
    try {
        const { access_key, secret_key } = req.headers;
        const { bucket } = req.params;
        const { prefix } = req.body;
        const files = req.files;
        
        if (!access_key || !secret_key || !bucket || !files) {
            return res.status(400).json({ 
                success: false, 
                message: 'Parâmetros inválidos' 
            });
        }
        
        // Configurar o cliente S3 com as credenciais
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });
        
        // Limite para upload multipart (5MB)
        const MULTIPART_THRESHOLD = 5 * 1024 * 1024;
        
        // Upload de cada arquivo
        const uploadPromises = files.map(file => {
            const key = prefix ? `${prefix}${file.originalname}` : file.originalname;
            
            // Verificar se o arquivo é grande o suficiente para upload multipart
            if (file.size > MULTIPART_THRESHOLD) {
                // Usar upload multipart para arquivos grandes
                return processLargeFile(
                    access_key,
                    secret_key,
                    bucket,
                    key,
                    file.path,
                    null // Sem callback de progresso no servidor
                );
            } else {
                // Usar upload padrão para arquivos pequenos
                return s3.upload({
                    Bucket: bucket,
                    Key: key,
                    Body: fs.createReadStream(file.path),
                    ContentType: file.mimetype
                }).promise();
            }
        });
        
        // Aguardar todos os uploads
        await Promise.all(uploadPromises);
        
        // Limpar arquivos temporários
        files.forEach(file => {
            fs.unlinkSync(file.path);
        });
        
        res.json({ 
            success: true, 
            message: `${files.length} arquivo(s) enviado(s) com sucesso` 
        });
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Rota para deletar um único objeto
app.delete('/object/:bucket/:key(*)', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket } = req.params;
    let { key } = req.params;
    
    if (!access_key || !secret_key || !bucket || !key) {
        return res.status(400).json({ 
            success: false, 
            message: 'Parâmetros inválidos' 
        });
    }

    try {
        // Decodificar a chave do objeto
        key = decodeURIComponent(key);
        
        // Configurar o cliente S3 com as credenciais
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });
        
        // Deletar o objeto
        await s3.deleteObject({
            Bucket: bucket,
            Key: key
        }).promise();
        
        res.json({ 
            success: true, 
            message: `Objeto ${key} deletado com sucesso` 
        });
    } catch (error) {
        console.error(`Erro ao deletar objeto ${key}:`, error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Rota para deletar múltiplos objetos
app.delete('/objects/:bucket', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket } = req.params;
    const { keys } = req.body;
    
    if (!access_key || !secret_key || !bucket || !keys || !Array.isArray(keys) || keys.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Parâmetros inválidos' 
        });
    }

    try {
        // Configurar o cliente S3 com as credenciais
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });
        
        // Preparar objetos para deleção
        const objects = keys.map(key => ({ Key: key }));
        
        // Deletar os objetos
        await s3.deleteObjects({
            Bucket: bucket,
            Delete: {
                Objects: objects,
                Quiet: false
            }
        }).promise();
        
        res.json({ 
            success: true, 
            message: `${keys.length} objeto(s) deletado(s) com sucesso` 
        });
    } catch (error) {
        console.error('Erro ao deletar objetos:', error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Rota para deletar um bucket (deve estar vazio)
app.delete('/bucket/:bucket', async (req, res) => {
    const { access_key, secret_key } = req.headers;
    const { bucket } = req.params;
    
    if (!access_key || !secret_key || !bucket) {
        return res.status(400).json({ 
            success: false, 
            message: 'Parâmetros inválidos' 
        });
    }

    try {
        // Configurar o cliente S3 com as credenciais
        const s3 = new AWS.S3({
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: 'us-east-1'
        });
        
        // Deletar o bucket
        await s3.deleteBucket({
            Bucket: bucket
        }).promise();
        
        res.json({ 
            success: true, 
            message: `Bucket ${bucket} deletado com sucesso` 
        });
    } catch (error) {
        console.error(`Erro ao deletar bucket ${bucket}:`, error);
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
});

// Importar rotas de upload multipart
const multipartRoutes = require('./multipart-init-route');
app.use(multipartRoutes);

// Usar as rotas de download
app.use(downloadRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV}`);
});