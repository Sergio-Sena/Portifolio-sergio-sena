import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import type { respostaPadraoMsg } from '../types/respostaPadraoMsg'
import NextCors from 'nextjs-cors';

export const politicaCORS = (handler: NextApiHandler) =>
    async (
        req: NextApiRequest, res: NextApiResponse<respostaPadraoMsg>
    ) => {
        try {
            // Obter a origem da requisição do ambiente ou usar localhost:3001 como padrão
            const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3001';
            
            // Configurar CORS para permitir a origem específica
            await NextCors(req, res, {
                origin: corsOrigin,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                credentials: true,
                optionsSuccessStatus: 200, // Para navegadores antigos que retornam 204
                allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
            });

            return await handler(req, res);
        } catch (e) {
            console.log('Erro ao tratar politica CORS:', e);
            return res.status(500).json({ erro: 'Erro ao tratar Politica de CORS.' });
        }
    };