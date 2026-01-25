const API_URL = "http://localhost:3000/students";

const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTableBody = document.querySelector("#students-table tbody");
const addStudentForm = document.getElementById("add-student-form");

getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);

async function getStudents() {
  try {
    const res = await fetch(API_URL);
    const students = await res.json();
    renderStudents(students);
  } catch (err) {
    alert("помилка отримання студентів");
  }
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
        <button onclick="updateStudent(${student.id})">оновити</button>
        <button onclick="deleteStudent(${student.id})">видалити</button>
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

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });

    addStudentForm.reset();
    getStudents();
  } catch (err) {
    alert("помилка додавання студента");
  }
}

async function updateStudent(id) {
  const name = prompt("Введіть нове ім'я:");
  const age = prompt("Введіть новий вік:");
  const course = prompt("Введіть новий курс:");
  const skills = prompt("Введіть нові навички (через кому):");
  const email = prompt("Введіть новий email:");
  const isEnrolled = confirm("Студент записаний? (OK = Так, Cancel = Ні)");

  if (!name || !age || !course || !skills || !email) return;

  const updatedStudent = {
    name,
    age: Number(age),
    course,
    skills: skills.split(",").map((s) => s.trim()),
    email,
    isEnrolled,
  };

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedStudent),
    });

    getStudents();
  } catch (err) {
    alert("помилка оновлення");
  }
}

window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;
