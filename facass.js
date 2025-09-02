function showSection(sectionId) {
    document.getElementById("assignment-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById(sectionId).style.display = "block";
}
let questions = { c: [], python: [], java: [], cplusplus: [] };
let currentQuestionIndex = 0;
let currentMode = 'add';
let editModeQuestions = [];

function openSection(section) {
    document.getElementById('addSection').style.display = 'none';
    document.getElementById('editSection').style.display = 'none';
    
    if (section === 'add') {
        document.getElementById('addSection').style.display = 'block';
        currentMode = 'add';
        clearFields();
    } else if (section === 'edit') {
        document.getElementById('editSection').style.display = 'block';
        currentMode = 'edit';
        loadQuestions();
    }
}

function closeSection(section) {
    if (confirm("Are you sure you want to close? All unsaved data will be lost.")) {
        if (section === 'add') {
            clearFields();
        }
        document.getElementById(`${section}Section`).style.display = 'none';
        alert(`Closed the ${section} section.`);
    }
}

function nextQuestion() {
    saveCurrentQuestion();
    clearFields();
    currentQuestionIndex++;
    updateButtons();
}

function prevQuestion(isEdit = false) {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex, isEdit);
    }
    updateButtons();
}

function submitQuiz(section) {
    const subject = section === 'add' ? document.getElementById('addSubject').value : document.getElementById('editSubject').value;
    
    if (questions[subject].length === 0) {
        alert("Cannot submit an empty quiz.");
        return;
    }
    
    alert(`Quiz submitted successfully in ${section} section!`);
    openSection('home');
}

function clearFields() {
    document.getElementById('addQuestion').value = '';
    document.getElementById('addChoice1').value = '';
    document.getElementById('addChoice2').value = '';
    document.getElementById('addChoice3').value = '';
    document.getElementById('addChoice4').value = '';
    document.getElementById('addAnswerKey').value = '';
}

function saveCurrentQuestion() {
    const subject = document.getElementById('addSubject').value;
    const question = {
        text: document.getElementById('addQuestion').value,
        choices: [
            document.getElementById('addChoice1').value,
            document.getElementById('addChoice2').value,
            document.getElementById('addChoice3').value,
            document.getElementById('addChoice4').value
        ],
        correct: document.getElementById('addAnswerKey').value
    };
    
    questions[subject].push(question);
}

function loadQuestions() {
    const subject = document.getElementById('editSubject').value;
    editModeQuestions = questions[subject];
    document.getElementById('editQuestionsList').innerHTML = '';
    
    editModeQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<strong>Question ${index + 1}:</strong> ${question.text}`;
        questionDiv.appendChild(document.createElement('br'));

        question.choices.forEach((choice, idx) => {
            questionDiv.innerHTML += `Choice ${idx + 1}: ${choice} <br>`;
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editQuestion(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteQuestion(index);

        questionDiv.appendChild(editButton);
        questionDiv.appendChild(deleteButton);

        document.getElementById('editQuestionsList').appendChild(questionDiv);
    });
}

function deleteQuestion(index) {
    const subject = document.getElementById('editSubject').value;
    questions[subject].splice(index, 1);
    loadQuestions();
    alert("Question deleted successfully.");
}

function editQuestion(index) {
    const subject = document.getElementById('editSubject').value;
    const question = questions[subject][index];

    document.getElementById('addQuestion').value = question.text;
    document.getElementById('addChoice1').value = question.choices[0];
    document.getElementById('addChoice2').value = question.choices[1];
    document.getElementById('addChoice3').value = question.choices[2];
    document.getElementById('addChoice4').value = question.choices[3];
    document.getElementById('addAnswerKey').value = question.correct;

    openSection('add');
}

function updateButtons() {
    document.getElementById('prevButton').style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
}
