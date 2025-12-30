const API_URL = "http://localhost:3000/students";

const btn = document.getElementById("get-students-btn");
const tbody = document.querySelector("#students-table tbody");
const form = document.getElementById("add-student-form");

btn.addEventListener("click", getStudents);
form.addEventListener("submit", addStudent);

function getStudents() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => renderStudents(data));
}

function renderStudents(students) {
  tbody.innerHTML = "";

  students.forEach((s) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s.id}</td>
      <td>${s.name}</td>
      <td>${s.age}</td>
      <td>${s.course}</td>
      <td>${s.skills.join(", ")}</td>
      <td>${s.email}</td>
      <td>${s.isEnrolled ? "✔️" : "❌"}</td>
      <td>
        <button onclick="updateStudent(${s.id})">оновити</button>
        <button onclick="deleteStudent(${s.id})">видалити</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function addStudent(e) {
  e.preventDefault();

  const student = {
    name: name.value,
    age: +age.value,
    course: course.value,
    skills: skills.value.split(","),
    email: email.value,
    isEnrolled: isEnrolled.checked,
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  }).then(getStudents);

  form.reset();
}

function updateStudent(id) {
  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isEnrolled: true }),
  }).then(getStudents);
}

function deleteStudent(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(getStudents);
}
