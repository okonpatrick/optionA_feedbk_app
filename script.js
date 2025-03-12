// script.js
document.getElementById("reinstallBtn").addEventListener("click", function () {
  // In a real implementation, this would trigger the reinstall process
  alert("Reinstall process would start here");
});

function handleReinstall() {
  // Add your reinstall logic here
  alert("Redirecting to reinstall process...");

  // Example confirmation dialog
  const confirmed = confirm("Are you sure you want to reinstall?");
  if (confirmed) {
    window.location.href = "/chrome/uninstall";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Expandable sections based on checkbox state
  const toggleExpand = (checkboxId, containerId) => {
    const checkbox = document.getElementById(checkboxId);
    const container = document.getElementById(containerId);

    checkbox.addEventListener("change", function () {
      container.classList.toggle("hidden", !this.checked);
    });
  };

  // Setup toggle for expandable sections
  toggleExpand("option4", "otherReasonContainer");
  toggleExpand("option6", "betterAlternativeContainer");
  toggleExpand("option8", "experienceContainer");
  toggleExpand("option9", "ratingContainer");

  // Close button functionality
  document.querySelectorAll(".close-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const container = this.closest(".feedback-text-container");
      container.classList.add("hidden");

      // Uncheck the associated checkbox
      const checkboxes = document.querySelectorAll(".feedback-checkbox");
      checkboxes.forEach((checkbox) => {
        if (
          checkbox.id === "option6" &&
          container.id === "betterAlternativeContainer"
        ) {
          checkbox.checked = false;
        }
      });
    });
  });

  // Star rating functionality
  let selectedRating = 0;

  const stars = document.querySelectorAll(".star-rating svg");

  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      const rating = index + 1; // Rating from 1-5 based on index
      selectedRating = rating;

      // Update visual state of stars
      stars.forEach((s, i) => {
        // For all stars up to and including the selected one, change fill color
        if (i <= index) {
          s.querySelector("path").setAttribute("fill", "#FFD700"); // Gold color for selected
        } else {
          s.querySelector("path").setAttribute("fill", "#BCD5E8"); // Default color for unselected
        }
      });
    });
  });

  document.querySelectorAll(".feedback-checkbox").forEach((checkbox) => {
    if (checkbox.checked) {
      let answerData = {
        option: checkbox.value,
        checked: true,
      };

      // Add text input values if applicable
      if (
        checkbox.id === "option4" &&
        document.getElementById("otherReasonText").value
      ) {
        answerData.text = document.getElementById("otherReasonText").value;
      } else if (
        checkbox.id === "option6" &&
        document.getElementById("betterAlternativeText").value
      ) {
        answerData.text = document.getElementById(
          "betterAlternativeText"
        ).value;
      } else if (
        checkbox.id === "option8" &&
        document.getElementById("experienceText").value
      ) {
        answerData.text = document.getElementById("experienceText").value;
      } else if (checkbox.id === "option9") {
        answerData.rating = selectedRating; // Use the selectedRating variable here
      }

      feedbackData.answers.push(answerData);
    }
  });

  // Form submission
 
  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Collect all elements
    const formElements = {
      option4: document.getElementById('otherReasonText'),
      option6: document.getElementById('betterAlternativeText'),
      option8: document.getElementById('experienceText'),
      option9: document.getElementById('option9')
    };
  
    // Initialize payload structure
    const payload = {
      selectedOptions: [],
      customMessages: {},
      rating: null
    };
  
    // Process checked checkboxes
    document.querySelectorAll('.feedback-checkbox:checked').forEach(checkbox => {
      const label = checkbox.nextElementSibling.textContent.trim();
      const optionId = checkbox.id;
  
      // Handle text input options
      if (formElements[optionId]) {
        switch(optionId) {
          case 'option4':
          case 'option6':
          case 'option8':
            const textValue = formElements[optionId].value.trim();
            if (textValue) payload.customMessages[label] = textValue;
            break;
          case 'option9':
            payload.rating = selectedRating;
            break;
        }
      }
      // Handle regular options
      else {
        payload.selectedOptions.push(label);
      }
    });
  
    // Validate rating if option9 is checked
    if (formElements.option9.checked) {
      if (!payload.rating || payload.rating < 1 || payload.rating > 5) {
        alert('Please select a valid star rating');
        return;
      }
    }
  
    // Validate at least one feedback option selected
    if (payload.selectedOptions.length === 0 && Object.keys(payload.customMessages).length === 0 && !payload.rating) {
      alert('Please select at least one feedback option');
      return;
    }
  
    // Send to API
    fetch('https://bs3y2uwgud.execute-api.us-east-1.amazonaws.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);

    // Show modal
    const modal = document.getElementById('successModal');
    modal.classList.remove('hidden');
  
// Optional: Reset form
      this.reset();
      document.querySelectorAll('.feedback-text-container').forEach(c => c.classList.add('hidden'));
      selectedRating = 0; // Reset rating

      // Redirect after 3 seconds
  setTimeout(() => {
    window.location.href = '/';
  }, 10000);
  
  // Close button handler
  document.querySelector('.modal-close-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting feedback');
    });
  });
});
