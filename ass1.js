// Show specific sections
function showSection(sectionId) {
    document.getElementById("assignment-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
}

// Close section
function closeSection(sectionId) {
    document.getElementById(sectionId).style.display = "none";
}

// Open and close modal for assignment image
function openModal(imgElement) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImage").src = imgElement.src;
}
function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

// Submit assignment with alert
function submitAssignment() {
    alert("Assignment submitted successfully!");
}

// Sample quiz questions set by mentor
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "8", "10", "12"],
        correctAnswer: "8"
    }
];

// Render quiz questions for student
function loadQuiz() {
    const quizContainer = document.getElementById("quiz-questions");
    quizQuestions.forEach((item, index) => {
        const questionElem = document.createElement("div");
        questionElem.classList.add("quiz-question");
        questionElem.innerHTML = `
            <p>${index + 1}. ${item.question}</p>
            ${item.options.map(option => `<label><input type="radio" name="q${index}" value="${option}"> ${option}</label><br>`).join('')}
        `;
        quizContainer.appendChild(questionElem);
    });
}

// Submit quiz and calculate score
function submitQuiz() {
    let score = 0, attempted = 0;
    quizQuestions.forEach((item, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption) {
            attempted++;
            if (selectedOption.value === item.correctAnswer) {
                score++;
            }
        }
    });

    const totalQuestions = quizQuestions.length;
    const notAttempted = totalQuestions - attempted;
    const incorrect = attempted - score;

    // Display scoreboard with results
    document.getElementById("total-questions").textContent = totalQuestions;
    document.getElementById("attempted-questions").textContent = attempted;
    document.getElementById("not-attempted-questions").textContent = notAttempted;
    document.getElementById("correct-answers").textContent = score;
    document.getElementById("incorrect-answers").textContent = incorrect;
    document.getElementById("score").textContent = `${score}/${totalQuestions}`;
    document.getElementById("scoreboard").style.display = "block";
}

// Load quiz questions on page load
window.onload = loadQuiz;
