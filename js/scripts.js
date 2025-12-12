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
});
