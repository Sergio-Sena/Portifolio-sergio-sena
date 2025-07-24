/**
 * Script principal para o site de portfólio
 * Inicializa particles.js, configura animações e interatividade
 */
document.addEventListener("DOMContentLoaded", function () {
  // Inicialização do particles.js
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#00f7ff",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.3,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00f7ff",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });

  // Smooth scrolling para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        
        // Atualiza a URL com o hash sem recarregar a página
        history.pushState(null, null, targetId);
      }
    });
  });

  // Animação de fade-in para seções quando entram na viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Garantir que a seção esteja visível
        entry.target.style.opacity = '1';
        entry.target.classList.add("animate-fadeIn");
        // Desregistra a observação após a animação ser aplicada
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("section.animate-on-scroll").forEach((section) => {
    observer.observe(section);
  });
  
  // Adicionar classe animate-on-scroll a seções específicas que queremos animar
  // Primeiro, garantimos que as seções estejam visíveis por padrão
  const sectionsToAnimate = document.querySelectorAll('#projects, #online-projects, #about, #contact');
  sectionsToAnimate.forEach(section => {
    // Garantir que as seções estejam visíveis
    section.style.opacity = '1';
    // Adicionar a classe para animação quando entrar na viewport
    section.classList.add('animate-on-scroll');
  });
  
  // Animação para os cards de projeto
  const projectCards = document.querySelectorAll('.card-hover');
  projectCards.forEach((card, index) => {
    // Adiciona um pequeno atraso para cada card, criando um efeito cascata
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // Inicializa os cards com opacidade 0 para a animação
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
  });
  
  // Formulário de contato com integração AWS API Gateway + Lambda
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Obter dados do formulário
      const formData = new FormData(contactForm);
      const formValues = {};
      
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      
      // Preparar UI para envio
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      const statusMessage = document.createElement('div');
      statusMessage.className = 'mt-4 p-4 rounded-lg';
      
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
      
      // Remover mensagem de status anterior, se existir
      const previousStatus = contactForm.querySelector('.status-message');
      if (previousStatus) {
        previousStatus.remove();
      }
      
      statusMessage.classList.add('status-message');
      
      // URL da API Gateway (substituir com a URL real após a implantação)
      const apiUrl = 'https://API_ID.execute-api.REGION.amazonaws.com/prod/contact';
      
      // Enviar dados para a API
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formValues.name,
          email: formValues.email,
          subject: formValues.subject,
          message: formValues.message
        })
      })
      .then(response => response.json())
      .then(data => {
        // Sucesso
        statusMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        statusMessage.classList.add('bg-green-500', 'bg-opacity-20', 'text-green-300');
        contactForm.reset();
      })
      .catch(error => {
        // Erro
        console.error('Erro ao enviar mensagem:', error);
        statusMessage.textContent = 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.';
        statusMessage.classList.add('bg-red-500', 'bg-opacity-20', 'text-red-300');
      })
      .finally(() => {
        // Restaurar UI
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        contactForm.appendChild(statusMessage);
        
        // Remover mensagem após 5 segundos
        setTimeout(() => {
          statusMessage.classList.add('opacity-0');
          setTimeout(() => statusMessage.remove(), 500);
        }, 5000);
      });
    });
  }
  
  // Destaca o link de navegação ativo com base na seção visível
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= (sectionTop - 300)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('text-cyan-400');
      }
    });
  });
});
