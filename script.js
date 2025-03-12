document.addEventListener("DOMContentLoaded", function () {
  console.log("FAQ script carregado!");

  // 🔹 Pequeno efeito nos cartões de plano
  const planos = document.querySelectorAll(".plano-card");
  planos.forEach((plano) => {
    plano.addEventListener("mouseover", () => {
      plano.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.3)";
    });

    plano.addEventListener("mouseleave", () => {
      plano.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    });
  });

  // 🔹 Rolagem suave para os links da barra de navegação
  document.querySelectorAll(".navbar a").forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const sectionId = this.getAttribute("href").substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    });
  });

  // 🔹 Carrossel de depoimentos
  const container = document.querySelector(".depoimentos-container");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  if (container && prevButton && nextButton) {
    let index = 0;
    const totalItems = document.querySelectorAll(".depoimento").length;
    let itemsPerView =
      window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    function updateCarousel() {
      itemsPerView =
        window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      const offset = -index * (100 / itemsPerView);
      container.style.transform = `translateX(${offset}%)`;
    }

    nextButton.addEventListener("click", () => {
      index = index < totalItems - itemsPerView ? index + 1 : 0;
      updateCarousel();
    });

    prevButton.addEventListener("click", () => {
      index = index > 0 ? index - 1 : totalItems - itemsPerView;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }

  // 🔹 Navbar dinâmica
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY;
    if (scrollTop > lastScrollTop) navbar.classList.add("show");
    else if (scrollTop === 0) navbar.classList.remove("show");
    lastScrollTop = scrollTop;
  });

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // 🔹 FAQ (Corrigido)
  const faqButtons = document.querySelectorAll(".faq-question");

  if (faqButtons.length > 0) {
    faqButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const answer = button.nextElementSibling;

        document.querySelectorAll(".faq-answer").forEach((otherAnswer) => {
          if (otherAnswer !== answer) {
            otherAnswer.classList.remove("active");
            otherAnswer.style.maxHeight = null;
          }
        });

        answer.classList.toggle("active");
        if (answer.classList.contains("active")) {
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.style.opacity = "1";
        } else {
          answer.style.maxHeight = "0";
          answer.style.opacity = "0";
        }

        button.classList.toggle("active");
      });
    });
  } else {
    console.warn("Nenhum item de FAQ encontrado!");
  }

  // 🔹 Efeito de corações na tela
  function criarCoracao() {
    const coracao = document.createElement("i");
    coracao.classList.add("fa-solid", "fa-heart");
    coracao.style.position = "fixed";
    coracao.style.left = Math.random() * window.innerWidth + "px";
    coracao.style.top = Math.random() * window.innerHeight + "px";
    coracao.style.fontSize = Math.random() * 10 + 8 + "px";
    coracao.style.color = "red";
    coracao.style.opacity = Math.random() * 0.6 + 0.3;
    coracao.style.zIndex = "9999";
    coracao.style.pointerEvents = "none";
    document.body.appendChild(coracao);

    const duracao = Math.random() * 4 + 3;
    const deslocamentoX = (Math.random() - 0.5) * 100;
    coracao.style.transition = `transform ${duracao}s linear, opacity ${duracao}s linear`;

    setTimeout(() => {
      coracao.style.transform = `translate(${deslocamentoX}px, ${
        window.innerHeight
      }px) rotate(${Math.random() * 360}deg)`;
      coracao.style.opacity = "0";
    }, 100);

    setTimeout(() => {
      coracao.remove();
    }, duracao * 1000);
  }

  setInterval(criarCoracao, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = document.querySelectorAll(".faq-question");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;

      console.log("Resposta antes do clique:", answer.style.maxHeight);

      if (answer.style.maxHeight && answer.style.maxHeight !== "0px") {
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
        button.classList.remove("active");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = "1";
        button.classList.add("active");
      }

      console.log("Resposta depois do clique:", answer.style.maxHeight);
    });
  });
});
