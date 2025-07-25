// Service Worker para PWA - Ritech Fechaduras
const CACHE_NAME = 'ritech-v1.2';
const STATIC_CACHE = 'ritech-static-v1.2';
const DYNAMIC_CACHE = 'ritech-dynamic-v1.2';

// Arquivos para cache estático
const STATIC_FILES = [
  '/',
  '/Index.html',
  '/styles.min.css',
  '/js/scripts.min.js',
  '/Images/Logo-RiTec.jpg',
  '/Images/LogoRitech.jpg',
  '/error.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', event => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 Service Worker: Cacheando arquivos estáticos');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Instalação concluída');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ Service Worker: Erro na instalação', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker: Ativando...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Remover caches antigos
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Service Worker: Removendo cache antigo', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Ativação concluída');
        return self.clients.claim();
      })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Estratégia Cache First para recursos estáticos
  if (STATIC_FILES.some(file => request.url.includes(file))) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('📦 Cache Hit:', request.url);
            return response;
          }
          
          console.log('🌐 Network Fetch:', request.url);
          return fetch(request)
            .then(fetchResponse => {
              // Cachear a resposta
              const responseClone = fetchResponse.clone();
              caches.open(STATIC_CACHE)
                .then(cache => cache.put(request, responseClone));
              
              return fetchResponse;
            });
        })
        .catch(() => {
          // Fallback para página offline
          if (request.destination === 'document') {
            return caches.match('/error.html');
          }
        })
    );
    return;
  }
  
  // Estratégia Network First para imagens
  if (request.destination === 'image') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cachear imagem se sucesso
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
          
          return response;
        })
        .catch(() => {
          // Tentar buscar no cache
          return caches.match(request);
        })
    );
    return;
  }
  
  // Estratégia padrão: Network First
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cachear apenas respostas válidas
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE)
            .then(cache => cache.put(request, responseClone));
        }
        
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Sincronização em background
self.addEventListener('sync', event => {
  console.log('🔄 Background Sync:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Implementar lógica de sincronização se necessário
      Promise.resolve()
    );
  }
});

// Notificações Push (futuro)
self.addEventListener('push', event => {
  console.log('📱 Push Notification:', event);
  
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/Images/Logo-ritech-sem-fundo.png',
    badge: '/Images/Logo-ritech-sem-fundo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Produtos',
        icon: '/Images/Logo-ritech-sem-fundo.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/Images/Logo-ritech-sem-fundo.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Ritech Fechaduras', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
  console.log('🔔 Notification Click:', event);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#produtos')
    );
  }
});

// Monitoramento de performance
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_METRICS') {
    console.log('📊 Performance Metrics:', event.data.metrics);
    
    // Aqui poderia enviar métricas para analytics
    // sendToAnalytics(event.data.metrics);
  }
});