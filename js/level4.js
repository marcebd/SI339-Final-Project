document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".story-section");
  
    sections.forEach((section, index) => {
      section.addEventListener("focus", () => {
        const next = sections[index + 1];
        if (next && next.classList.contains("hidden-section")) {
          next.classList.remove("hidden-section");
          next.classList.add("visible");
        }
      });
    });
  });
  