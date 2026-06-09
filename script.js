let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = "<p>No tasks yet 😴</p>";
    document.getElementById("taskCount").innerText = "";
    return;
  }

  let total = tasks.length;
  let completed = tasks.filter(task => task.completed).length;
  let remaining = total - completed;

  document.getElementById("taskCount").innerText =
    `${total} tasks | ${completed} completed | ${remaining} remaining`;

  tasks.forEach((task, index) => {

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.onclick = function () {
      toggleTask(index);
    };

    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    let time = document.createElement("small");
    time.innerText = task.time;

    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = function () {
      editTask(index);
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(time);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function addTask() {

  let input = document.getElementById("taskInput");
  let task = input.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  if (editIndex === -1) {

    tasks.push({
      text: task,
      completed: false,
      time: new Date().toLocaleString()
    });

  } else {

    tasks[editIndex].text = task;
    editIndex = -1;

  }

  saveTasks();

  input.value = "";

  showTasks();
}

function deleteTask(index) {

  tasks.splice(index, 1);

  saveTasks();

  showTasks();
}

function toggleTask(index) {

  tasks[index].completed = !tasks[index].completed;

  saveTasks();

  showTasks();
}

function editTask(index) {

  document.getElementById("taskInput").value =
    tasks[index].text;

  editIndex = index;
}

function clearAll() {

  if (confirm("Delete all tasks?")) {

    tasks = [];

    saveTasks();

    showTasks();
  }
}

document
  .getElementById("taskInput")
  .addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
      addTask();
    }

  });

showTasks();
showTasks();
