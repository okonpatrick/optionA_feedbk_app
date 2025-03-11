// script.js
document.getElementById("reinstallBtn").addEventListener("click", function () {
  // In a real implementation, this would trigger the reinstall process
  alert("Reinstall process would start here");
  // window.location.href = "chrome://extensions/?id=your_extension_id";
  // Or use the Chrome Web Store URL for your extension
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
  let selectedRating = 1;

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
  // Modified form submission handler
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // 1. Collect base data
  const customReason = document.getElementById('otherReasonText').value.trim();
  const rating = selectedRating;

  // 2. Validate rating
  if (!rating || rating < 1 || rating > 5) {
      alert('Please provide a rating between 1-5 stars');
      return;
  }

  // 3. Create question ID mapping
  const questionIdMap = {
      'more_notifications': 'q1',
      'spend_money': 'q2',
      'ads_showing': 'q3',
      'other_reason': 'q4',  // Will be handled separately
      'not_as_expected': 'q5',
      'better_alternative': 'q6',
      'performance_impact': 'q7',
      'experience_feedback': 'q8',
      'rate_experience': 'q9'
  };

  // 4. Build predefinedAnswers array
  const predefinedAnswers = [];
  
  document.querySelectorAll('.feedback-checkbox:checked').forEach(checkbox => {
      const optionValue = checkbox.value;
      
      // Skip special cases handled elsewhere
      if (optionValue === 'other_reason' || optionValue === 'rate_experience') return;

      predefinedAnswers.push({
          questionId: questionIdMap[optionValue],
          question: "How would you rate the user interface?", // Update with actual questions
          options: ["Poor", "Average", "Excellent"],
          selectedOption: "Average" // Replace with actual value mapping
      });
  });

  // 5. Build final payload
  const payload = {
      predefinedAnswers: predefinedAnswers,
      customReason: customReason,
      rating: rating
  };

  // 6. Send to API
  fetch('https://bs3y2uwgud.execute-api.us-east-1.amazonaws.com/posts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      alert('Feedback submitted successfully!');
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error submitting feedback');
  });
});
  
});
