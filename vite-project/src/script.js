const API_URL = "http://localhost:3000/students";

const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTableBody = document.querySelector("#students-table tbody");
const addStudentForm = document.getElementById("add-student-form");

// GET
async function getStudents() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderStudents(data);
}

// render
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
        <button class="update-btn" data-id="${student.id}">Оновити</button>
        <button class="delete-btn" data-id="${student.id}">Видалити</button>
      </td>
    `;

    studentsTableBody.appendChild(tr);
  });

  // Додаємо обробники подій для нових кнопок
  document.querySelectorAll(".update-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      updateStudent(id);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      deleteStudent(id);
    });
  });
}

// POST
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

// PATCH
async function updateStudent(id) {
  const name = prompt("Введіть нове ім'я:");

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  getStudents();
}

// DELETE
async function deleteStudent(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  getStudents();
}

// Події
getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);
