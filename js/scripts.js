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
