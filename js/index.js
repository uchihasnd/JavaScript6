import { navbar } from "./navbar.js";
document.getElementById("navbar-container").innerHTML = navbar();

const btnSave = document.getElementById("btn-save");
const formElement = document.getElementById("formId");
console.log("Test");

const getContact = () => {
  const contact = {
    first_name: document.getElementById("first-name").value,
    last_name: document.getElementById("last-name").value,
    company: document.getElementById("company").value,
    job_title: document.getElementById("job-title").value,
    email: document.getElementById("emailContact").value,
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
    .then(() => {
      console.log("test");
      window.location.href = "tableContacts.html";
      // const name = document.createElement("td");
      // name.textContent = contact.first_name;
    });
};

formElement.addEventListener("submit", getContact);
