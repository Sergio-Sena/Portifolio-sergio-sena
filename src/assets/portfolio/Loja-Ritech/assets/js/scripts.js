// Gerar QR Code
document.addEventListener("DOMContentLoaded", function () {
  const qr = qrcode(0, "L");
  qr.addData("https://wa.me/5511966007636");
  qr.make();
  document.getElementById("qrcode").innerHTML = qr.createImgTag(4);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

//* Script para funcionalidade de compra *//

// Garante que o código execute após o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os botões de compra
  const botoesCompra = document.querySelectorAll(".comprar-btn");

  // Adiciona evento de clique a cada botão
  botoesCompra.forEach((botao) => {
    botao.addEventListener("click", function () {
      // Encontra o container do produto pai
      const produto = this.closest("article");

      // Extrai informações do produto
      const nomeProduto = produto.querySelector("h3").textContent;
      const precoProduto = produto.querySelector(".neon-blue").textContent;

      // Cria a mensagem pré-formatada
      const mensagem = `Olá gostaria de comprar o modelo ${nomeProduto} com o valor de ${precoProduto}.`;

      // Gera o link do WhatsApp com a mensagem codificada
      const whatsappURL = `https://wa.me/5511966007636?text=${encodeURIComponent(
        mensagem
      )}`;

      // Abre o WhatsApp em uma nova aba
      window.open(whatsappURL, "_blank");
    });
  });
});

// Variáveis globais
let currentImageIndex = 0;
let galleryImages = [];

// Função para abrir a galeria
function openGallery(button) {
  const imageElement = button.parentElement.querySelector("img");
  galleryImages = JSON.parse(imageElement.getAttribute("data-gallery"));
  currentImageIndex = 0;

  // Define a primeira imagem
  document.getElementById("expandedImage").src = galleryImages[currentImageIndex];

  // Exibe o modal
  document.getElementById("galleryModal").classList.add("active");
}

// Função para fechar a galeria
document.addEventListener("DOMContentLoaded", function () {
  const closeGalleryButton = document.getElementById("closeGallery");
  if (closeGalleryButton) {
    closeGalleryButton.addEventListener("click", function () {
      document.getElementById("galleryModal").classList.remove("active");
    });
  }

  // Função para navegar entre as imagens (anterior)
  const prevButton = document.getElementById("prevImage");
  if (prevButton) {
    prevButton.addEventListener("click", function () {
      if (galleryImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        document.getElementById("expandedImage").src = galleryImages[currentImageIndex];
      }
    });
  }

  // Função para navegar entre as imagens (próxima)
  const nextButton = document.getElementById("nextImage");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      if (galleryImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        document.getElementById("expandedImage").src = galleryImages[currentImageIndex];
      }
    });
  }

  // Fechar ao clicar fora do modal
  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    galleryModal.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.remove("active");
      }
    });
  }
});

