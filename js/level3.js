document.addEventListener("DOMContentLoaded", () => {
    const bgColorInput = document.getElementById("bgColor");
    const textColorInput = document.getElementById("textColor");
    const applyBtn = document.getElementById("applyBtn");
    const poster = document.getElementById("poster-preview");
    const feedback = document.getElementById("contrastResult");
    const successMessage = document.getElementById("level3-success");
  
    applyBtn.addEventListener("click", () => {
      const bgColor = bgColorInput.value;
      const textColor = textColorInput.value;
  
      // Apply colors to poster
      poster.style.backgroundColor = bgColor;
      poster.style.color = textColor;
  
      // Calculate contrast ratio
      const ratio = getContrastRatio(bgColor, textColor);
      const roundedRatio = ratio.toFixed(2);
  
      // Display feedback
      if (ratio >= 4.5) {
        feedback.textContent = `✅ Contrast ratio: ${roundedRatio}:1 — Passed!`;
        successMessage.classList.remove("hidden");
        successMessage.scrollIntoView({ behavior: "smooth" });
      } else {
        feedback.textContent = `❌ Contrast ratio: ${roundedRatio}:1 — Too low. Try again! (Minimum is 4.5:1)`;
      }
    });
  
    // --- Helper functions below ---
  
    // Converts #RRGGBB to {r, g, b}
    function hexToRgb(hex) {
      const parsed = hex.replace("#", "");
      const bigint = parseInt(parsed, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    }
  
    // Calculate relative luminance
    function getLuminance({ r, g, b }) {
      const normalize = (v) => {
        v = v / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
    }
  
    // Get contrast ratio between two colors
    function getContrastRatio(hex1, hex2) {
      const lum1 = getLuminance(hexToRgb(hex1));
      const lum2 = getLuminance(hexToRgb(hex2));
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    }
  });
  