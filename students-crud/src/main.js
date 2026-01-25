const API_URL = "http://localhost:3000/students";

const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTableBody = document.querySelector("#students-table tbody");
const addStudentForm = document.getElementById("add-student-form");

async function getStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderStudents(data);
}

function renderStudents(students) {
  studentsTableBody.innerHTML = "";
  students.forEach((student) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "Так" : "Ні"}</td>
      <td>
        <button onclick="updateStudent(${student.id})">Оновити</button>
        <button onclick="deleteStudent(${student.id})">Видалити</button>
      </td>
    `;
    studentsTableBody.appendChild(tr);
  });
}

async function addStudent(e) {
  e.preventDefault();
  const newStudent = {
    name: document.getElementById("name").value,
    age: +document.getElementById("age").value,
    course: document.getElementById("course").value,
    skills: document
      .getElementById("skills")
      .value.split(",")
      .map((s) => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newStudent),
  });

  getStudents();
  addStudentForm.reset();
}

async function updateStudent(id) {
  const name = prompt("Введіть нове ім'я:");
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  getStudents();
}

async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  getStudents();
}

getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);

window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;
