function openFeedback() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackOverlay = document.getElementById('feedback-overlay');
    feedbackForm.style.display = 'block'; // Show the form
    feedbackOverlay.style.display = 'block'; // Show the overlay
  }
  
  // Function to close the feedback form
  function closeFeedback() {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackOverlay = document.getElementById('feedback-overlay');
    feedbackForm.style.display = 'none'; // Hide the form
    feedbackOverlay.style.display = 'none'; // Hide the overlay
  }
  
  