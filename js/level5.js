document.addEventListener("DOMContentLoaded", () => {
  const objectionText = document.getElementById("objection-text");
  const answersContainer = document.getElementById("answers");
  const feedbackBox = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score");
  const progressIndicator = document.getElementById("progress-indicator");
  const verdictBox = document.getElementById("verdict");
  const verdictMessage = document.getElementById("verdict-message");
  const restartBtn = document.getElementById("restart-btn");
  const saveQueenBtn = document.getElementById("save-queen-btn");

  const totalRounds = 5;
  let currentQuestion = 0;
  let score = 0;
  let questions = [
    {
      objection: "Placeholders are just like labels. Why bother adding both?",
      answers: [
        { text: "Labels remain visible when users type — placeholders disappear.", correct: true },
        { text: "Placeholders work for everyone and are easier to style.", correct: false },
        { text: "Only screen reader users care about labels.", correct: false }
      ]
    },
    {
      objection: "If your site looks good visually, accessibility is covered.",
      answers: [
        { text: "Visual design doesn't guarantee keyboard or screen reader access.", correct: true },
        { text: "Visual design is all users need.", correct: false },
        { text: "Alt text and contrast are optional if design is strong.", correct: false }
      ]
    },
    {
      objection: "ARIA can fix anything, so I don't need semantic HTML.",
      answers: [
        { text: "Using semantic HTML is more reliable — ARIA is only a supplement.", correct: true },
        { text: "ARIA is more modern and replaces tags like <main> or <button>.", correct: false },
        { text: "Screen readers prefer ARIA roles over native HTML.", correct: false }
      ]
    },
    {
      objection: "If something is hidden visually, it’s gone for everyone.",
      answers: [
        { text: "Not true — screen readers can still access visually hidden content if coded correctly.", correct: true },
        { text: "Hiding content visually always removes it from accessibility tree.", correct: false },
        { text: "CSS display:none is more accessible than aria-hidden.", correct: false }
      ]
    },
    {
      objection: "Why label form fields? The placeholders are enough.",
      answers: [
        { text: "Screen readers don't read placeholders reliably. Labels are required for clarity.", correct: true },
        { text: "As long as the input has a name attribute, it's accessible.", correct: false },
        { text: "You can skip labels if the fields are simple.", correct: false }
      ]
    },
    {
      objection: "Color contrast doesn’t really matter — people can zoom in.",
      answers: [
        { text: "Poor contrast makes content unreadable for low-vision users. Zooming doesn't fix that.", correct: true },
        { text: "Contrast is only important for legal compliance, not UX.", correct: false },
        { text: "If users struggle, they should enable high contrast mode.", correct: false }
      ]
    },
    {
      objection: "Alt text is pointless. People can see images.",
      answers: [
        { text: "Alt text is critical for screen reader users and improves SEO.", correct: true },
        { text: "If the image is decorative, just describe it anyway.", correct: false },
        { text: "Alt text is optional unless you're describing art.", correct: false }
      ]
    }
  ];

  // Shuffle questions and limit to totalRounds
  questions = questions.sort(() => Math.random() - 0.5).slice(0, totalRounds);

  function loadQuestion() {
    feedbackBox.textContent = "";
    const q = questions[currentQuestion];
    objectionText.textContent = `👾 Anti-A11y: “${q.objection}”`;
    progressIndicator.textContent = `Question ${currentQuestion + 1} of ${totalRounds}`;
    answersContainer.innerHTML = "";

    // Shuffle answers
    const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach((ans) => {
      const btn = document.createElement("button");
      btn.classList.add("answer-btn");
      btn.setAttribute("tabindex", "0");
      btn.textContent = ans.text;
      btn.dataset.correct = ans.correct;
      btn.setAttribute("aria-label", `Answer: ${ans.text}`);
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("role", "button");
      btn.addEventListener("click", handleAnswer);
      answersContainer.appendChild(btn);
    });
  }

  function handleAnswer(e) {
    const isCorrect = e.target.dataset.correct === "true";

    if (isCorrect) {
      score++;
      feedbackBox.textContent = "✅ Correct!";
      feedbackBox.style.color = "#2e7d32";
    } else {
      feedbackBox.textContent = "❌ Incorrect.";
      feedbackBox.style.color = "#c62828";
    }

    scoreDisplay.textContent = `Score: ${score}`;
    currentQuestion++;

    if (currentQuestion >= totalRounds) {
      setTimeout(endGame, 1200);
    } else {
      setTimeout(loadQuestion, 1200);
    }
  }

  function endGame() {
    document.getElementById("main-content").classList.add("hidden");
    verdictBox.classList.remove("hidden");
    verdictBox.classList.add("visible")

    if (score === totalRounds) {
      verdictMessage.innerHTML = "🎉 You defeated Anti-A11y and restored justice to Webaria!";
      saveQueenBtn.classList.remove("hidden");
      restartBtn.classList.add("hidden");
    } else if (score >= 3) {
      verdictMessage.innerHTML = "⚖️ You made your case. Webaria is safer, but Anti-A11y escaped.";
    } else {
      verdictMessage.innerHTML = "💥 Anti-A11y wins this round. Try again and fight for justice.";
    }
  }

  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = "Score: 0";
    verdictBox.classList.remove("visible");
    verdictBox.classList.add("hidden");
    document.getElementById("main-content").classList.remove("hidden");
    questions = questions.sort(() => Math.random() - 0.5).slice(0, totalRounds);
    loadQuestion();
  });

  saveQueenBtn.addEventListener("click", () => {
    window.location.href = "victory.html";
  });

  loadQuestion();
});
