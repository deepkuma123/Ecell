document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the loading element
        const loadingIndicator = document.querySelector(".loading");

        // Show loading indicator
        loadingIndicator.style.display = "block";

        const formData = new FormData(contactForm);

        // Frontend validation (you can customize this based on your requirements)
        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");

        if (!name || !email || !subject || !message) {
            displayErrorMessage("Please fill in all fields");
            // Hide loading indicator on validation error
            loadingIndicator.style.display = "none";
            return;
        }

        fetch(contactForm.action, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                displayErrorMessage(data.error);
            } else {
                displaySentMessage();
            }
        })
        .catch((error) => {
            displayErrorMessage("Error sending message. Please try again later.");
        })
        .finally(() => {
            // Hide loading indicator after the request is complete
            loadingIndicator.style.display = "none";
        });
    });

    function displaySentMessage() {
        // Display success message and hide others
        document.querySelector(".error-message").style.display = "none";
        document.querySelector(".sent-message").style.display = "block";

        // Reset the form   
        contactForm.reset();
    }

    function displayErrorMessage(message) {
        // Display error message and hide others
        const errorMessage = document.querySelector(".error-message");
        errorMessage.style.display = "block";
        errorMessage.textContent = message;

        // Hide success message on error
        document.querySelector(".sent-message").style.display = "none";
    }

    
});

document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the email value
    const email = document.getElementById('newsemail').value;

    // Make a POST request
fetch('/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      alert(data.message);
    } else {
      alert('Subscription failed. ' + data.message);
    }
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred. Please try again.');
  });
  });
