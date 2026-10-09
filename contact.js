// JavaScript assignment: display the user's current date and time, and validate the contact form.
const dateTimeDisplay = document.getElementById("current-date-time");
const supportForm = document.getElementById("support-form");
const preferredDate = document.getElementById("preferred-date");
const formMessage = document.getElementById("form-message");

// JS Date/Time: use the visitor's local clock and update it each second.
function updateDateTime() {
    const now = new Date();
    dateTimeDisplay.textContent = "Current date and time: " + now.toLocaleString();
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Set the earliest selectable date to today, using local time (not UTC).
function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
preferredDate.min = localDateString(new Date());

// JS form validation: required fields and email format use HTML5 validation;
// this handler adds a custom date check and an on-page confirmation message.
supportForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Do not navigate or pretend to send data to a server.
    formMessage.className = "form-message";
    formMessage.textContent = "";

    if (!supportForm.reportValidity()) {
        formMessage.textContent = "Please correct the highlighted fields before submitting.";
        formMessage.classList.add("error");
        return;
    }
    if (preferredDate.value < localDateString(new Date())) {
        formMessage.textContent = "Please choose today or a future date.";
        formMessage.classList.add("error");
        preferredDate.focus();
        return;
    }

    const name = document.getElementById("full-name").value.trim();
    if (!name) {
        formMessage.textContent = "Please enter your name.";
        formMessage.classList.add("error");
        document.getElementById("full-name").focus();
        return;
    }
    formMessage.textContent = `Thank you, ${name}! Your form was validated successfully. This is a demonstration, so no request was sent.`;
    formMessage.classList.add("success");
    supportForm.reset();
});
