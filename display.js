document.addEventListener('DOMContentLoaded', function () {
    let certificates = JSON.parse(localStorage.getItem('certificates')) || [];
    const certificatesList = document.getElementById('certificates');
    const uploadForm = document.getElementById('uploadForm');

    // Display certificates
    function displayCertificates() {
        certificatesList.innerHTML = '';
        certificates.forEach((cert, index) => {
            const certItem = document.createElement('div');
            certItem.classList.add('certificate-item');
            certItem.innerHTML = `
                <h2>${cert.title}</h2>
                <p>${cert.date}</p>
                <img src="${cert.image}" alt="${cert.title}" class="cert-image">
                <button class="delete-btn" onclick="deleteCertificate(${index})">Delete</button>
            `;
            certificatesList.appendChild(certItem);
        });
    }

    // Add certificate
    uploadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const imageFile = document.getElementById('image').files[0];

        // Check for image file
        if (!imageFile) return alert("Please upload an image.");

        const reader = new FileReader();
        reader.onload = function () {
            const image = reader.result;
            certificates.push({ title, date, image });
            localStorage.setItem('certificates', JSON.stringify(certificates));
            displayCertificates();
            uploadForm.reset();
        };
        reader.readAsDataURL(imageFile);
    });

    // Delete certificate
    window.deleteCertificate = function (index) {
        certificates.splice(index, 1);
        localStorage.setItem('certificates', JSON.stringify(certificates));
        displayCertificates();
    };

    // Initial display
    displayCertificates();
});
