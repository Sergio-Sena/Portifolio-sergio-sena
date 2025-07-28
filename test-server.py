#!/usr/bin/env python3
import http.server
import socketserver
import webbrowser
import os

# Configurações
PORT = 8000
DIRECTORY = "public"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

# Mudar para o diretório do projeto
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Iniciar servidor
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Servidor rodando em: http://localhost:{PORT}")
    print(f"Para testar mobile: F12 -> Toggle Device Toolbar")
    print(f"Para parar: Ctrl+C")
    
    # Abrir navegador automaticamente
    webbrowser.open(f'http://localhost:{PORT}')
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor parado!")
        httpd.shutdown()