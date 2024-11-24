document.addEventListener("DOMContentLoaded", function () {
    // Function to load stored recommendations from localStorage
    function loadRecommendations() {
        const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        
        recommendations.forEach(function(rec) {
            createRecommendation(rec.name, rec.description);
        });
    }

    // Function to create and display a recommendation
    function createRecommendation(name, description) {
        const newRecommendation = document.createElement('div');
        newRecommendation.classList.add('recommendation-box');

        // Title and Description
        const title = document.createElement('div');
        title.classList.add('recommendation-title');
        title.innerHTML = `<strong>${name}</strong>`;

        const desc = document.createElement('div');
        desc.classList.add('recommendation-description');
        desc.innerHTML = `<p>"${description}"</p>`;

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = 'Remove';
        removeButton.addEventListener('click', function() {
            newRecommendation.remove();
            removeRecommendationFromStorage(name, description); // Remove from localStorage
        });

        // Append elements to the new recommendation box
        newRecommendation.appendChild(title);
        newRecommendation.appendChild(desc);
        newRecommendation.appendChild(removeButton);

        // Append the new recommendation to the container
        document.querySelector('.recommendations-container').appendChild(newRecommendation);
    }

    // Function to save recommendation to localStorage
    function saveRecommendation(name, description) {
        const recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations.push({ name, description });
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
    }

    // Function to remove recommendation from localStorage
    function removeRecommendationFromStorage(name, description) {
        let recommendations = JSON.parse(localStorage.getItem('recommendations')) || [];
        recommendations = recommendations.filter(rec => !(rec.name === name && rec.description === description));
        localStorage.setItem('recommendations', JSON.stringify(recommendations));
    }

    // Handle form submission
    document.getElementById('recommendationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const name = document.getElementById('name1').value;
        const description = document.getElementById('description').value;

        if (!name) {
            alert('Please enter a valid name.');
            return;
        }
        if (!description) {
            alert('Please enter a recommendation.');
            return;
        }

        // Save to localStorage and create recommendation box
        saveRecommendation(name, description);
        createRecommendation(name, description);

        // Clear form inputs
        document.getElementById('recommendationForm').reset();
    });

    // Load recommendations when the page is loaded
    loadRecommendations();
});
