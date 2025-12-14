document.addEventListener("DOMContentLoaded", () => {
  const headerCtaBtn = document.getElementById("header-cta-btn");

  if (headerCtaBtn) {
    headerCtaBtn.addEventListener("click", () => {
      const ctaSection = document.getElementById("cta-section");
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const form = document.getElementById("emailForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Impede a página de recarregar

      const button = document.getElementById("submitBtn");
      const emailInput = document.getElementById("emailInput");
      const originalBtnText = button.innerText;

      button.innerText = "Enviando...";
      button.disabled = true;

      const formData = new FormData(form);

      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxrxu594Gp_U2liliOPXg1PjwBpWOk8fqy3jeUFYHAAoPfYLqJrC9JYcgxxOjZaZ4Vv/exec";

      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        });

        button.innerText = "Inscrito!";

        button.style.backgroundColor = "#152E2B";
        button.style.color = "#05DC7F";
        button.style.border = "1px solid #05DC7F";

        emailInput.value = "";

        setTimeout(() => {
          button.innerText = originalBtnText;
          button.disabled = false;
          button.style.backgroundColor = "";
          button.style.color = "";
          button.style.border = "";
        }, 3000);
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro ao conectar. Verifique sua internet.");
        button.innerText = originalBtnText;
        button.disabled = false;
      }
    });
  }
});

function toggleLike(element) {
  const counter = element.querySelector("span");
  // Pega o valor atual (ex: 55)
  let currentCount = parseInt(counter.innerText);

  if (element.classList.contains("liked")) {
    element.classList.remove("liked");
    counter.innerText = currentCount - 1;
  } else {
    element.classList.add("liked");
    counter.innerText = currentCount + 1;
  }
}

// --- NOVA FUNÇÃO PARA O TOGGLE DA DESCRIÇÃO ---
function toggleMobileOverlay(button) {
  // Encontra o elemento pai com a classe .mockup-overlay
  const overlay = button.closest(".mockup-overlay");
  // Alterna a classe 'minimized'
  overlay.classList.toggle("minimized");
}

/* --- LÓGICA DO CARROSSEL INFINITO COM AUTOPLAY E PAUSA --- */
const carouselStage = document.getElementById("carouselStage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.querySelectorAll(".indicator-dot");

// Variáveis para controlar o tempo
let autoplayInterval;
let resumeTimeout;
const AUTOPLAY_SPEED = 4000; // Tempo entre trocas automáticas (3s)
const PAUSE_DURATION = 5000; // Tempo de espera após clique (5s)

if (carouselStage && prevBtn && nextBtn) {
  // Função que atualiza as classes visuais e bolinhas
  function updateCarouselClasses() {
    const cards = carouselStage.querySelectorAll(".mockup-container");

    // 1. Reseta classes dos cards
    cards.forEach((card) => {
      card.classList.remove("active-card", "side-card");
    });

    // 2. Define classes visuais (o do meio, índice 1, é o active)
    cards[1].classList.add("active-card");
    cards[0].classList.add("side-card");
    cards[2].classList.add("side-card");

    // 3. Atualiza as bolinhas com base no data-index do card central
    const activeIndex = cards[1].getAttribute("data-index");
    indicators.forEach((dot) => {
      dot.classList.remove("active");
      if (dot.getAttribute("data-target") === activeIndex) {
        dot.classList.add("active");
      }
    });
  }

  // Ação de ir para o Próximo
  const goToNext = () => {
    const firstCard = carouselStage.firstElementChild;
    carouselStage.appendChild(firstCard);
    updateCarouselClasses();
  };

  // Ação de ir para o Anterior
  const goToPrev = () => {
    const lastCard = carouselStage.lastElementChild;
    carouselStage.insertBefore(lastCard, carouselStage.firstElementChild);
    updateCarouselClasses();
  };

  // --- LÓGICA DE AUTOPLAY ---

  const startAutoplay = () => {
    // Garante que não criamos múltiplos intervalos
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(goToNext, AUTOPLAY_SPEED);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Função para lidar com a interação do usuário (clique)
  const handleUserInteraction = (actionFunction) => {
    // 1. Para o autoplay imediatamente
    stopAutoplay();
    // 2. Limpa qualquer timeout de retomada anterior (se o usuário clicar rápido várias vezes)
    clearTimeout(resumeTimeout);

    // 3. Executa a ação do clique (avançar ou voltar)
    actionFunction();

    // 4. Agenda o reinício do autoplay
    resumeTimeout = setTimeout(() => {
      startAutoplay();
    }, PAUSE_DURATION);
  };

  // --- EVENT LISTENERS ---

  nextBtn.addEventListener("click", () => {
    handleUserInteraction(goToNext);
  });

  prevBtn.addEventListener("click", () => {
    handleUserInteraction(goToPrev);
  });

  // Inicia tudo
  updateCarouselClasses();
  startAutoplay(); // Começa a rodar sozinho ao carregar a página
}

/* ========================================= */
/* FAQ ACCORDION LOGIC */
/* ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const answer = question.nextElementSibling;
      const isExpanded = question.getAttribute("aria-expanded") === "true";

      // 1. Fecha todos os outros itens primeiro (opcional, mas recomendado para UX)
      document.querySelectorAll(".faq-question").forEach((otherQuestion) => {
        if (otherQuestion !== question) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherQuestion.parentElement.classList.remove("active");
          otherQuestion.nextElementSibling.style.maxHeight = null;
        }
      });

      // 2. Alterna o estado do item atual
      if (isExpanded) {
        // Fechar
        question.setAttribute("aria-expanded", "false");
        faqItem.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        // Abrir
        question.setAttribute("aria-expanded", "true");
        faqItem.classList.add("active");
        // Define a altura máxima com base no conteúdo real (scrollHeight)
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
