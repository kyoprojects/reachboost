console.log('executing script');
// Ensure code runs only after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Utility function to close a popup modal by name
  function closeModal(modalName) {
    const modal = document.querySelector(`[popupmodal=${modalName}]`);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  // Function to handle form submission for trial-signup-email
  function handleTrialSignupEmail(event, form) {
    event.preventDefault(); // Ensure default form submission is prevented

    // Display the modal
    const modal = document.querySelector('[popupmodal=waitlist-signup]');
    // focus on the name input
    document.querySelector('[input=waitlist-signup-name]').focus();

    if (modal) {
      modal.style.display = 'flex';
    }

    // Get the email from the first form input with the name "email-prefill"
    const emailInput = form.querySelector('input[name="email-prefill"]');
    const emailValue = emailInput ? emailInput.value : '';

    // Prefill the waitlist email input and set background color
    const waitlistEmailInput = document.querySelector('[input=waitlist-signup-email]');
    if (waitlistEmailInput) {
      waitlistEmailInput.value = emailValue;
      waitlistEmailInput.style.backgroundColor = '#f0f0f0'; // Very light grey
    }
  }

  // Event listener for forms with the attribute [formtrigger=trial-signup-email]
  document.querySelectorAll('[formtrigger=trial-signup-email]').forEach(form => {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const emailInput = form.querySelector('input[name="email-prefill"]');

    // Handle click event on submit button
    if (submitButton) {
      submitButton.addEventListener('click', event => {
        handleTrialSignupEmail(event, form);
      });
    }

    // Handle Enter keydown event on email input
    if (emailInput) {
      emailInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          handleTrialSignupEmail(event, form);
        }
      });
    }
  });

  // Event listener for forms with the attribute [formtrigger=trial-signup]
  const trialSignupForm = document.querySelector('[formtrigger=trial-signup]');
  if (trialSignupForm) {
    trialSignupForm.addEventListener('submit', event => {
      event.preventDefault(); // Prevent the default form submission

      const formData = new FormData(trialSignupForm);

      // Convert FormData to a JSON object for sending in the request body
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Use fetch to send form data to the webhook endpoint
      fetch('https://api.misc.sleak.chat/webhook/waitlist-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          console.log('Form submitted successfully:', result);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    });
  }

  // Event listener for elements with the attribute [popupmodal-closetrigger={name}]
  document.querySelectorAll('[popupmodal-closetrigger]').forEach(closeTrigger => {
    const modalName = closeTrigger.getAttribute('popupmodal-closetrigger');

    closeTrigger.addEventListener('click', () => {
      closeModal(modalName);
    });
  });
});
