const STORAGE_KEY = "students";

const initialStudents = [
  {
    id: 1,
    name: "Ivan Petrenko",
    age: 15,
    course: "Web Development",
    skills: ["HTML", "CSS", "JavaScript"],
    email: "ivan.petrenko@example.com",
    isEnrolled: true,
  },
  {
    id: 2,
    name: "Olha Kovalenko",
    age: 16,
    course: "Game Development",
    skills: ["C#", "Unity"],
    email: "olha.kovalenko@example.com",
    isEnrolled: true,
  },
  {
    id: 3,
    name: "Dmytro Shevchenko",
    age: 14,
    course: "Mobile App Development",
    skills: ["Java", "Kotlin", "Android Studio"],
    email: "dmytro.shevchenko@example.com",
    isEnrolled: false,
  },
  {
    id: 4,
    name: "Anastasia Ivanova",
    age: 17,
    course: "Data Science",
    skills: ["Python", "Pandas", "Machine Learning"],
    email: "anastasia.ivanova@example.com",
    isEnrolled: true,
  },
  {
    id: 5,
    name: "Mykola Bondarenko",
    age: 15,
    course: "Cybersecurity",
    skills: ["Networking", "Ethical Hacking", "Linux"],
    email: "mykola.bondarenko@example.com",
    isEnrolled: true,
  },
];

if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStudents));
}

function getStudentsFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveStudentsToStorage(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

const getStudentsBtn = document.getElementById("get-students-btn");
const studentsTableBody = document.querySelector("#students-table tbody");
const addStudentForm = document.getElementById("add-student-form");

getStudentsBtn.addEventListener("click", getStudents);
addStudentForm.addEventListener("submit", addStudent);

function getStudents() {
  const students = getStudentsFromStorage();
  renderStudents(students);
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

function addStudent(e) {
  e.preventDefault();

  const students = getStudentsFromStorage();

  const newStudent = {
    id: Date.now(),
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

  students.push(newStudent);
  saveStudentsToStorage(students);

  e.target.reset();
  getStudents();
}

function updateStudent(id) {
  const students = getStudentsFromStorage();
  const student = students.find((s) => s.id === id);

  if (!student) return;

  const name = prompt("Ім'я:", student.name);
  const age = prompt("Вік:", student.age);
  const course = prompt("Курс:", student.course);
  const skills = prompt("Навички:", student.skills.join(", "));
  const email = prompt("Email:", student.email);
  const isEnrolled = confirm("Записаний?");

  if (!name || !age || !course || !skills || !email) return;

  student.name = name;
  student.age = Number(age);
  student.course = course;
  student.skills = skills.split(",").map((s) => s.trim());
  student.email = email;
  student.isEnrolled = isEnrolled;

  saveStudentsToStorage(students);
  getStudents();
}

function deleteStudent(id) {
  const students = getStudentsFromStorage();
  const filtered = students.filter((s) => s.id !== id);

  saveStudentsToStorage(filtered);
  getStudents();
}

window.updateStudent = updateStudent;
window.deleteStudent = deleteStudent;
