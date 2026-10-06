// JavaScript for interactive elements on the EduTrack page

// Profile dropdown functionality
const profileIcon = document.querySelector('.profile-icon');
const profileDropdown = document.querySelector('.profile-dropdown');

profileIcon.addEventListener('click', (event) => {
  event.stopPropagation(); // Prevents click from closing the dropdown immediately
  profileDropdown.classList.toggle('show'); // Toggle dropdown visibility
});

document.addEventListener('click', () => {
  if (profileDropdown.classList.contains('show')) {
    profileDropdown.classList.remove('show'); // Close dropdown if clicked outside
  }
});

// Sliding ad functionality
let currentAdIndex = 0;
const adContent = document.querySelector('.ad-content');
const adTitles = [
  'EDU<i class="fa-solid fa-book-open-reader"></i>TRACK', 
  'Boost Your Learning with EduTrack!', 
  'Stay on Top of Assignments and Quizzes!'
];

document.getElementById('prev-ad').addEventListener('click', showPreviousAd);
document.getElementById('next-ad').addEventListener('click', showNextAd);

function showPreviousAd() {
  currentAdIndex = (currentAdIndex === 0) ? adTitles.length - 1 : currentAdIndex - 1;
  updateAdContent();
}

function showNextAd() {
  currentAdIndex = (currentAdIndex + 1) % adTitles.length;
  updateAdContent();
}

function updateAdContent() {
  adContent.innerHTML = `<h2 class="slide-title">${adTitles[currentAdIndex]}</h2>`;
}

// Feedback form toggle functionality
const feedbackOverlay = document.getElementById('feedback-overlay');
const feedbackForm = document.getElementById('feedback-form');

function openFeedback() {
  feedbackOverlay.style.display = 'block';
  feedbackForm.style.display = 'block';
}

function closeFeedback() {
  feedbackOverlay.style.display = 'none';
  feedbackForm.style.display = 'none';
}

// About section functionality (dummy function for demonstration)
function openAbout() {
  alert('This would navigate to the About Us page or show an About Us modal.');
}

// Prevent event listeners from activating until the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  profileIcon.addEventListener('click', toggleDropdown);
  feedbackOverlay.addEventListener('click', closeFeedback);
});

// Select the form and add an event listener for form submission
const feedbackFormElement = document.querySelector('#feedback-form form');

feedbackFormElement.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Retrieve form data
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const feedback = document.getElementById('feedback').value;

  // Create an object to store the feedback details
  const feedbackData = {
    name: name,
    gender: gender,
    feedback: feedback,
    date: new Date().toISOString() // Capture the date of submission
  };

  // Retrieve existing feedbacks from Local Storage or create a new array
  const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
  
  // Add new feedback to the array
  feedbacks.push(feedbackData);

  // Save the updated feedbacks array back to Local Storage
  localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

  // Optionally, clear the form fields after submission
  feedbackFormElement.reset();

  // Close the feedback form
  closeFeedback();

  alert('Thank you for your feedback!');
});

// Retrieve and parse the feedback data from Local Storage
const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

// Loop through feedbacks and log each to the console
storedFeedbacks.forEach(feedback => {
  console.log(`Name: ${feedback.name}, Gender: ${feedback.gender}, Feedback: ${feedback.feedback}, Date: ${feedback.date}`);
});
