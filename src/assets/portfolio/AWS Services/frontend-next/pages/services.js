import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Services({ showNotification }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();
  
  // Verificar autenticação
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, router]);
  
  const handleLogout = () => {
    logout();
    router.push('/');
  };
  
  if (isLoading) {
    return (
      <div className="gradient-bg min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <p className="mt-4 text-lg text-white">Carregando...</p>
      </div>
    );
  }
  
  return (
    <div className="gradient-bg min-h-screen text-white p-4">
      <Head>
        <title>Módulos AWS</title>
      </Head>
      
      {/* Header com Navbar */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="cloud-container mr-4">
            <i className="fas fa-cloud text-5xl neon-blue cloud-icon"></i>
            <div className="cloud-pulse"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold neon-blue">Módulos AWS</h1>
            <p className="text-slate-300 mt-1">Gerencie seus serviços AWS</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center hover:shadow-lg hover:shadow-red-900/30"
          data-tooltip="Sair da conta"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-4xl font-bold neon-blue mb-4">Escolha um Serviço AWS</h2>
          <p className="text-slate-300">Selecione um dos serviços abaixo para começar a gerenciar seus recursos AWS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* S3 Card */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <i className="fas fa-database text-6xl neon-blue mb-4"></i>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold neon-blue">Amazon S3</h3>
              <p className="text-slate-300 mt-2">Armazenamento de objetos escalável e durável</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Gerenciar buckets</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Upload/download de arquivos</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Organizar em pastas</li>
            </ul>
            <div className="text-center">
              <Link href="/dashboard">
                <span className="neon-button inline-block w-full py-3 px-6 rounded-lg transition duration-200 cursor-pointer">
                  <i className="fas fa-external-link-alt mr-2"></i> Acessar S3
                </span>
              </Link>
            </div>
          </div>

          {/* Lambda Card */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-center mb-6">
              <i className="fas fa-code text-6xl neon-orange mb-4"></i>
              <h3 className="text-2xl font-bold neon-orange">AWS Lambda</h3>
              <p className="text-slate-300 mt-2">Computação serverless para execução de código</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Gerenciar funções</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Configurar gatilhos</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Monitorar execuções</li>
            </ul>
            <div className="text-center">
              <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 inline-block w-full cursor-not-allowed opacity-70 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse opacity-30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-tools mr-2"></i> Em Desenvolvimento
                </div>
              </button>
            </div>
          </div>

          {/* EC2 Card */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-center mb-6">
              <i className="fas fa-server text-6xl neon-green mb-4"></i>
              <h3 className="text-2xl font-bold neon-green">Amazon EC2</h3>
              <p className="text-slate-300 mt-2">Servidores virtuais na nuvem</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Gerenciar instâncias</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Configurar segurança</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Monitorar recursos</li>
            </ul>
            <div className="text-center">
              <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 inline-block w-full cursor-not-allowed opacity-70 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse opacity-30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-tools mr-2"></i> Em Desenvolvimento
                </div>
              </button>
            </div>
          </div>

          {/* CloudFront Card */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-6">
              <i className="fas fa-globe text-6xl neon-purple mb-4"></i>
              <h3 className="text-2xl font-bold neon-purple">CloudFront</h3>
              <p className="text-slate-300 mt-2">Rede de entrega de conteúdo global</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Gerenciar distribuições</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Configurar origens</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Monitorar métricas</li>
            </ul>
            <div className="text-center">
              <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 inline-block w-full cursor-not-allowed opacity-70 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse opacity-30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-tools mr-2"></i> Em Desenvolvimento
                </div>
              </button>
            </div>
          </div>

          {/* DynamoDB Card */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-center mb-6">
              <i className="fas fa-table text-6xl neon-yellow mb-4"></i>
              <h3 className="text-2xl font-bold neon-yellow">DynamoDB</h3>
              <p className="text-slate-300 mt-2">Banco de dados NoSQL gerenciado</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Gerenciar tabelas</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Consultar dados</li>
              <li className="flex items-center"><i className="fas fa-check text-green-400 mr-2"></i> Configurar índices</li>
            </ul>
            <div className="text-center">
              <button className="bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 inline-block w-full cursor-not-allowed opacity-70 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-pulse opacity-30"></div>
                <div className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-tools mr-2"></i> Em Desenvolvimento
                </div>
              </button>
            </div>
          </div>

          {/* Placeholder para futuros serviços */}
          <div className="neon-border rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <i className="fas fa-plus-circle text-6xl text-slate-500 mb-4"></i>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500 rounded-full opacity-0 animate-ping" style={{ animationDuration: '3s' }}></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-400">Mais Serviços</h3>
              <p className="text-slate-300 mt-2">Novos serviços em breve</p>
            </div>
            <ul className="text-slate-300 mb-6 space-y-2">
              <li className="flex items-center"><i className="fas fa-clock text-slate-400 mr-2"></i> RDS</li>
              <li className="flex items-center"><i className="fas fa-clock text-slate-400 mr-2"></i> SQS/SNS</li>
              <li className="flex items-center"><i className="fas fa-clock text-slate-400 mr-2"></i> CloudWatch</li>
            </ul>
            <div className="text-center">
              <button className="bg-slate-700 text-slate-400 font-bold py-3 px-6 rounded-lg transition duration-200 inline-block w-full cursor-not-allowed">
                <i className="fas fa-hourglass-half mr-2"></i> Em Breve
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer com informações adicionais */}
        <div className="mt-16 text-center text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <p className="mb-2">Precisa de ajuda com os serviços AWS?</p>
          <a 
            href="https://aws.amazon.com/pt/documentation/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors hover-glow"
          >
            Consulte a documentação oficial da AWS
          </a>
        </div>
      </main>
    </div>
  );
}