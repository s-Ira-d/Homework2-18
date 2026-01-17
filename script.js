const API_URL = "https://6969262469178471522cc161.mockapi.io/Students";

// Функція для отримання всіх студентів
function getStudents() {
  // твій код
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => renderStudents(data.students))
    .catch((err) => console.error("Помилка при отриманні студентів:", err));
}

// Функція для відображення студентів у таблиці
function renderStudents(students) {
  // твій код
  const tbody = document.querySelector("#students-table tbody");
  tbody.innerHTML = "";

  students.forEach((student) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.course}</td>
      <td>${student.skills.join(", ")}</td>
      <td>${student.email}</td>
      <td>${student.isEnrolled ? "так" : "ні"}</td>
    <td>
  <button class="update-btn" data-id="${student.id}">оновити</button>
  <button class="delete-btn" data-id="${student.id}">видалити</button>
</td>

    `;

    tbody.appendChild(tr);
  });
}

// Функція для додавання нового студента
function addStudent(e) {
  // твій код
  e.preventDefault();

  const student = {
    name: document.getElementById("name").value,
    age: Number(document.getElementById("age").value),
    course: document.getElementById("course").value,
    skills: document
      .getElementById("skills")
      .value.split(",")
      .map((s) => s.trim()),
    email: document.getElementById("email").value,
    isEnrolled: document.getElementById("isEnrolled").checked,
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
    .then(() => getStudents())
    .catch((err) => console.error("помилка при додаванні студента:", err));

  e.target.reset();
}

// Функція для оновлення студента
function updateStudent(id) {
  // твій код
  const newCourse = prompt("введи новий курс студента:");
  if (!newCourse) return;

  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course: newCourse }),
  })
    .then(() => getStudents())
    .catch((err) => console.error("помилка при оновленні студента:", err));
}

// Функція для видалення студента
function deleteStudent(id) {
  // твій код
  if (!confirm("ви впевнені, що хочете видалити цього студента?")) return;

  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => getStudents())
    .catch((err) => console.error("помилка при видаленні студента:", err));
}

document
  .getElementById("get-students-btn")
  .addEventListener("click", getStudents);
document
  .getElementById("add-student-form")
  .addEventListener("submit", addStudent);
