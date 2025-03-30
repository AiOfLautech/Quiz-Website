document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
  const courseId = localStorage.getItem("selectedCourseId");
  const quizContainer = document.getElementById("quizContainer");
  const timerDisplay = document.getElementById("timeRemaining");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitQuiz");

  let questions = [];
  let currentQuestionIndex = 0;
  let answers = [];
  let timerInterval;
  let remainingTime = 0;

  if (!courseId) {
    alert("No course selected.");
    window.location.href = "main.html";
    return;
  }

  async function loadQuiz() {
    try {
      const res = await fetch("/api/quiz/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ courseId })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("quizSessionId", data.quizSessionId);
        questions = data.questions;
        answers = new Array(questions.length).fill("");
        // Use remainingTime from response; if not provided, default to timerDuration * 60.
        remainingTime = data.remainingTime || (data.timerDuration ? data.timerDuration * 60 : 0);
        displayQuestion(currentQuestionIndex);
        startTimer(remainingTime);
      } else {
        alert(data.message || "Failed to start quiz");
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  }

  function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    const question = questions[index];
    let html = `<div class="question"><h2>Question ${index + 1}: ${question.question}</h2></div>`;
    if (question.options && question.options.length > 0) {
      html += `<div class="options">`;
      question.options.forEach((option, i) => {
        html += `
          <div>
            <input type="radio" name="option" id="option${i}" value="${option}" ${answers[index] === option ? "checked" : ""}>
            <label for="option${i}">${option}</label>
          </div>
        `;
      });
      html += `</div>`;
    } else {
      // Open-ended question: add a text input and an "Enter" button
      html += `<div class="options">
                <input type="text" id="userAnswer" placeholder="Your answer" value="${answers[index] || ''}">
                <button id="enterAnswer" onclick="saveCurrentAnswer(); return false;">Enter</button>
              </div>`;
    }
    quizContainer.innerHTML = html;
  }

  window.saveCurrentAnswer = function() {
    const userAnswerInput = document.getElementById("userAnswer");
    if (userAnswerInput) {
      answers[currentQuestionIndex] = userAnswerInput.value;
    }
  };

  function saveAnswer() {
    if (questions[currentQuestionIndex].options && questions[currentQuestionIndex].options.length > 0) {
      const options = document.getElementsByName("option");
      options.forEach(opt => {
        if (opt.checked) {
          answers[currentQuestionIndex] = opt.value;
        }
      });
    } else {
      const userAnswerInput = document.getElementById("userAnswer");
      if (userAnswerInput) {
        answers[currentQuestionIndex] = userAnswerInput.value;
      }
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      saveAnswer();
      currentQuestionIndex--;
      displayQuestion(currentQuestionIndex);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
      saveAnswer();
      currentQuestionIndex++;
      displayQuestion(currentQuestionIndex);
    }
  });

  submitBtn.addEventListener("click", async () => {
    saveAnswer();
    const quizSessionId = localStorage.getItem("quizSessionId");
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quizSessionId, answers })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Quiz submitted. Your score: " + data.score);
        window.location.href = "result.html";
      } else {
        alert(data.message || "Quiz submission failed");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  });

  function startTimer(initialTime) {
    let time = initialTime;
    timerInterval = setInterval(() => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      timerDisplay.textContent = `${minutes}m ${seconds}s`;
      if (time <= 0) {
        clearInterval(timerInterval);
        submitBtn.click();
      }
      time--;
    }, 1000);
  }

  loadQuiz();
});
