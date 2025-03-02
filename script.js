// script.js
document.addEventListener("DOMContentLoaded", function () {
  const accordion = document.querySelector(".accordion");

  // Questions stored in an object
  const questions = [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit?",
    },
  ];

  // Array to store responses
  const responses = [];

  // Render all questions
  function renderQuestions() {
    questions.forEach((question, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.classList.add("accordion-item");

      // Add vertical blue tick line
      const blueTickLine = document.createElement("div");
      blueTickLine.classList.add("blue-tick-line");

      const accordionHeader = document.createElement("div");
      accordionHeader.classList.add("accordion-header");

      // Add question number
      const questionNumber = document.createElement("span");
      questionNumber.classList.add("question-number");
      questionNumber.textContent = `${index + 1}.`;
      accordionHeader.appendChild(questionNumber);

      // Add question text
      const questionText = document.createElement("span");
      questionText.textContent = question.text;
      accordionHeader.appendChild(questionText);

     // Add check button
const checkButton = document.createElement("button");
checkButton.classList.add("check-button");

// Load SVG from the images folder
const svgIcon = document.createElement("img");
svgIcon.src = "images/Form_Control_Element.svg"; // Path to your SVG file
svgIcon.alt = "Check Icon";
svgIcon.style.width = "16px"; // Adjust size as needed
svgIcon.style.height = "16px"; // Adjust size as needed

checkButton.appendChild(svgIcon);

checkButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent accordion from toggling
  alert(`Question ${index + 1} marked as completed!`);
});
accordionHeader.appendChild(checkButton);

      const accordionContent = document.createElement("div");
      accordionContent.classList.add("accordion-content");

      const inputField = document.createElement("textarea");
      inputField.classList.add("input-field");
      inputField.setAttribute("placeholder", "Enter text here...");

      const primaryBtn = document.createElement("button");
      primaryBtn.classList.add("primary-btn");
      primaryBtn.textContent =
        index === questions.length - 1 ? "Submit Form" : "Submit";
      primaryBtn.addEventListener("click", () => {
        const responseText = inputField.value.trim();
        if (responseText) {
          // Save the response
          responses.push({
            questionId: question.id,
            response: responseText,
          });

          // Log the response to the console
          console.log("Responses:", responses);

          // Collapse the current question
          accordionItem.classList.remove("active");

          // If it's the last question, submit the form
          if (index === questions.length - 1) {
            submitResponses();
          }
        } else {
          alert("Please enter your response before continuing.");
        }
      });

      accordionContent.appendChild(inputField);
      accordionContent.appendChild(primaryBtn);
      accordionItem.appendChild(accordionHeader);
      accordionItem.appendChild(accordionContent);
      accordion.appendChild(accordionItem);

      // Toggle accordion on header click
      accordionHeader.addEventListener("click", () => {
        accordionItem.classList.toggle("active");
      });
    });
  }

  // Submit responses to the endpoint
  function submitResponses() {
    const endpoint = "https://your-api-endpoint.com/submit-feedback"; // Replace with your API endpoint

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responses),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Feedback submitted successfully!");
        console.log("Response from server:", data);
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
        alert("An error occurred while submitting feedback.");
      });
  }

  // Render all questions
  renderQuestions();
});