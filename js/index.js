import { navbarFormContact, navbarTableContacts } from "./navbar.js";
document.addEventListener("DOMContentLoaded", function () {
  const navbarForm = document.getElementById("navbar-form-contact");
  const navbarTable = document.getElementById("navbar-table-contacts");

  if (navbarForm) {
    navbarForm.innerHTML = navbarFormContact();
  }

  if (navbarTable) {
    navbarTable.innerHTML = navbarTableContacts();
  }

  const loadingSpinner = document.getElementById("spinner");
  const formElement = document.getElementById("formId");

  const getContact = () => {
    const contact = {
      first_name: document.getElementById("first-name").value,
      last_name: document.getElementById("last-name").value,
      email: document.getElementById("emailContact").value,
      phone_number: document.getElementById("phone-number").value,
      job_title: document.getElementById("job-title").value,
      company: document.getElementById("company").value,
    };

    loadingSpinner.style.opacity = "1";

    fetch("https://reqres.in/api/users?delay=4", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
    })
      .then((response) => response.json())
      .then(() => {
        const storedContact =
          JSON.parse(localStorage.getItem("contacts")) || [];
        storedContact.push(contact);
        localStorage.setItem("contacts", JSON.stringify(storedContact));
        window.location.href = "tableContacts.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const contacts = JSON.parse(localStorage.getItem("contacts"));

  const tableBody = document.querySelector(".table-body");

  if (tableBody) {
    contacts.forEach((contact) => {
      const row = document.createElement("tr");
      row.classList.add("table-row-body");

      const nameCell = document.createElement("td");
      nameCell.classList.add("table-data-cell");
      nameCell.textContent = `${contact.first_name} ${contact.last_name}`;

      const emailCell = document.createElement("td");
      emailCell.classList.add("table-data-cell");
      emailCell.textContent = contact.email;

      const phoneCell = document.createElement("td");
      phoneCell.classList.add("table-data-cell");
      phoneCell.textContent = contact.phone_number;

      const jobCell = document.createElement("td");
      jobCell.classList.add("table-data-cell");
      if (contact.job_title && contact.company) {
        jobCell.textContent = `${contact.job_title} at ${contact.company}`;
      } else {
        jobCell.textContent = `${contact.job_title || contact.company}`;
      }

      row.appendChild(nameCell);
      row.appendChild(emailCell);
      row.appendChild(phoneCell);
      row.appendChild(jobCell);

      tableBody.appendChild(row);
    });
  }

  if (formElement) {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      getContact();
    });
  }
});
