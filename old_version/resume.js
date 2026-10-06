// script.js

// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if resume data exists in localStorage and display it
    if (localStorage.getItem('resumeData')) {
        const storedData = JSON.parse(localStorage.getItem('resumeData'));
        displayResume(storedData);
        populateForm(storedData); // Populate the form with existing data
    }

    // Get the form element
    const form = document.getElementById('resumeForm');

    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const education = document.getElementById('education').value;
        const skills = document.getElementById('skills').value;
        const experience = document.getElementById('experience').value;

        // Create an object to store the resume data
        const resumeData = {
            name,
            email,
            phone,
            education,
            skills,
            experience
        };

        // Store the data in localStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));

        // Display the resume data
        displayResume(resumeData);
    });

    // Function to display the resume data on the page
    function displayResume(data) {
        document.getElementById('resumeName').textContent = data.name;
        document.getElementById('resumeEmail').textContent = data.email;
        document.getElementById('resumePhone').textContent = data.phone;
        document.getElementById('resumeEducation').textContent = data.education;
        document.getElementById('resumeSkills').textContent = data.skills;
        document.getElementById('resumeExperience').textContent = data.experience;
    }

    // Function to populate the form with existing data from localStorage
    function populateForm(data) {
        document.getElementById('name').value = data.name;
        document.getElementById('email').value = data.email;
        document.getElementById('phone').value = data.phone;
        document.getElementById('education').value = data.education;
        document.getElementById('skills').value = data.skills;
        document.getElementById('experience').value = data.experience;
    }
});
