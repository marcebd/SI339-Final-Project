document.addEventListener("DOMContentLoaded", () => {
    const posters = document.querySelectorAll(".poster");
    const feedback = document.getElementById("poster-feedback");
    const successMessage = document.getElementById("level2-success");
  
    const badPosters = document.querySelectorAll(".bad-contrast");
    let totalToFind = badPosters.length;
    let found = 0;
  
    posters.forEach(poster => {
      poster.addEventListener("click", () => handlePosterClick(poster));
      poster.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePosterClick(poster);
        }
      });
    });
  
    function handlePosterClick(poster) {
      // Ignore repeated clicks
      if (poster.classList.contains("clicked")) return;
  
      poster.classList.add("clicked");
  
      if (poster.classList.contains("bad-contrast")) {
        found++;
        feedback.textContent = "🕶️ Great spot! That poster fails contrast standards.";
      } else {
        feedback.textContent = "⚠️ Oops! That one actually passes contrast. Try another.";
      }
  
      if (found === totalToFind) {
        successMessage.classList.remove("hidden");
        successMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
  