let t="http://localhost:3000/students",e=document.getElementById("get-students-btn"),n=document.querySelector("#students-table tbody"),d=document.getElementById("add-student-form");function u(){fetch(t).then(t=>t.json()).then(t=>{var e;return e=t,void(n.innerHTML="",e.forEach(t=>{let e=document.createElement("tr");e.innerHTML=`
      <td>${t.id}</td>
      <td>${t.name}</td>
      <td>${t.age}</td>
      <td>${t.course}</td>
      <td>${t.skills.join(", ")}</td>
      <td>${t.email}</td>
      <td>${t.isEnrolled?"✔️":"❌"}</td>
      <td>
        <button onclick="updateStudent(${t.id})">\u{43E}\u{43D}\u{43E}\u{432}\u{438}\u{442}\u{438}</button>
        <button onclick="deleteStudent(${t.id})">\u{432}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
      </td>
    `,n.appendChild(e)}))})}e.addEventListener("click",u),d.addEventListener("submit",function(e){e.preventDefault(),fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:name.value,age:+age.value,course:course.value,skills:skills.value.split(","),email:email.value,isEnrolled:isEnrolled.checked})}).then(u),d.reset()});
//# sourceMappingURL=students-crud.cd08f68f.js.map
