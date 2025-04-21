
document.addEventListener("DOMContentLoaded", () => {
    const realButton = document.getElementById("realBtn");
    const successMessage = document.getElementById("success-message");
  
    // When real button is activated, show success message
    realButton.addEventListener("click", () => {
      successMessage.classList.remove("hidden");
      successMessage.scrollIntoView({ behavior: "smooth" });
      realButton.setAttribute("disabled", true); // Prevent re-click
    });
  
  });
  