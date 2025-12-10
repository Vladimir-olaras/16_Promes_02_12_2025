console.log("first participant");

setTimeout(() => {
  console.log("second participant");
}, 0);

console.log("third participant");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((users) => {
    const container = document.createElement("div");
   
    container.style.display = "flex";
    container.style.gap = "20px";
    document.body.appendChild(container);

    // lista utilizatorilor
    const ol = document.createElement("ol");
    container.appendChild(ol);
     ol.style.border = "1px solid gray";
     ol.style.borderRadius = "8px"

    // fereastra de detalii (în dreapta)
    const info = document.createElement("div");
    info.style.border = "1px solid gray";
    info.style.padding = "10px";
    info.style.margin = "40px";
    info.style.width = "250px";
    info.style.borderRadius = "8px";
    info.innerHTML = "<h3>Detalii utilizator</h3><p>Selectează un nume...</p>";
    container.appendChild(info);

    // populăm lista
    for (const user of users) {
      const li = document.createElement("li");
      li.textContent = user.name;
      li.style.cursor = "pointer";

      li.onclick = () => {
        info.innerHTML = `
          <h1>${user.name}</h1>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Telefon:</b> ${user.phone}</p>
          <p><b>Website:</b> ${user.website}</p>
          <p><b>Companie:</b> ${user.company.name}</p>
          <p><b>Adresă:</b> ${user.address.city}, ${user.address.street}</p>
           <button id="deleteBtn">Close</button>`;

        const deleteBtn = document.getElementById("deleteBtn");
        deleteBtn.style.backgroundColor = "green";
        deleteBtn.style.color = "white";

        deleteBtn.onclick = () => {
          // ol.removeChild(li);
          info.innerHTML = "<h3>User Info</h3><p>Select a name...</p>";

          deleteBtn.textContent = "Deleted!";
        };
      };

      ol.appendChild(li);
    }
  });

// TODO Отобразить список задач
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((todos) => {
    // TODO Отобразить список пользователей
    const ol = document.createElement("ol");
    ol.classList.add("list-group");
    document.body.appendChild(ol);
    todos.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}.  ${task.title}`;
      li.classList.add("list-group-item");
      li.style.textDecoration = task.completed ? "line-through" : "none";
      ol.appendChild(li);
      const taskStatusInput = document.createElement("input");
      taskStatusInput.type = "checkbox";
      taskStatusInput.classList.add("mx-3");
      taskStatusInput.checked = task.completed ? true : false;
      // !!!
      const taskChangeButton = document.createElement("button");
      taskChangeButton.textContent = "Edit Task";
      taskChangeButton.style.borderRadius = "5px";

      taskChangeButton.onclick = () => {
        const inputChangeTask = document.createElement("input");
        inputChangeTask.type = "text";
        inputChangeTask.classList.add("form-control");
        inputChangeTask.value = task.title;
        const buttonSaveTask = document.createElement("button");
        buttonSaveTask.textContent = "Save Task";
        li.innerHTML = "";
        li.appendChild(inputChangeTask);
        li.appendChild(buttonSaveTask);
        buttonSaveTask.style.borderRadius = "5px";
        buttonSaveTask.style.backgroundColor = "green";
        buttonSaveTask.onclick = () => {
          task.title = inputChangeTask.value;
          li.innerHTML = "";
          li.textContent = `${index + 1}.  ${task.title}`;

          li.appendChild(taskStatusInput);
          li.appendChild(taskChangeButton);
        };
        // li.innerHTML = "";
      };
      li.appendChild(taskStatusInput);
      li.appendChild(taskChangeButton);
      taskStatusInput.onchange = () => {
        task.completed = !task.completed;
        li.style.textDecoration = task.completed ? "line-through" : "none";
      };
    });
  });
