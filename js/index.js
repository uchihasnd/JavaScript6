import { navbar } from "./navbar.js";
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("navbar-container").innerHTML = navbar();

  const btnSave = document.getElementById("btn-save");
  const formElement = document.getElementById("formId");
  console.log("Test");

  const getContact = () => {
    const contact = {
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
      email: document.getElementById("emailContact").value,
      phone_number: document.getElementById("phone-number").value,
      job_title: document.getElementById("job-title").value,
      company: document.getElementById("company").value,
    };

    console.log("Test");

    btnSave.textContent = "Sending...";

    fetch("https://reqres.in/api/users?delay=4", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => window.location.href = "tableContacts.html")
      .then(() => {
        const tableBody = document.querySelector(".table-body");

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `${contact.first_name} ${contact.last_name}`;

        const emailCell = document.createElement("td");
        emailCell.textContent = contact.email;

        const phoneNumberCell = document.createElement("td");
        phoneNumberCell.textContent = contact.phone_number;

        const jobCompanyCell = document.createElement("td");
        jobCompanyCell.textContent = `${contact.job_title} at ${contact.company}`;

        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(phoneNumberCell);
        row.appendChild(jobCompanyCell);

        tableBody.appendChild(row);
      });
  };

  if (formElement) {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      getContact();
    });
  }
});
