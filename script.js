let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

// SHOW TASKS
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

    let span = document.createElement("span");
    span.innerText = task.text;

    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    span.onclick = function () {
      toggleTask(index);
    };

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

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

// ADD TASK
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
      completed: false
    });
  } else {
    tasks[editIndex].text = task;
    editIndex = -1;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  showTasks();
}

// DELETE TASK
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

// TOGGLE COMPLETE
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}

// EDIT TASK
function editTask(index) {
  let input = document.getElementById("taskInput");
  input.value = tasks[index].text;
  editIndex = index;
}

// CLEAR ALL
function clearAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}

// ENTER KEY SUPPORT
document
  .getElementById("taskInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

// INITIAL LOAD
showTasks();