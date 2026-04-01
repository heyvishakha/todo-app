let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;


function showTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

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

    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.onclick = function () {
      deleteTask(index);
    };

    let editBtn = document.createElement("button");
editBtn.innerText = "Edit";

editBtn.onclick = function () {
  editTask(index);
};

li.appendChild(editBtn);


    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}
function clearAll() {
  tasks = [];
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showTasks();
}
function clearAll() {
  if (confirm("Are you sure?")) {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
}


function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;

  if (task === "") return;

  if (editIndex === -1) {
    // normal add
    tasks.push({
      text: task,
      completed: false
    });
  } else {
    // update existing
    tasks[editIndex].text = task;
    editIndex = -1;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  input.value = "";
  showTasks();
}

function editTask(index) {
  let input = document.getElementById("taskInput");

  input.value = tasks[index].text;

  editIndex = index;
}
let count = tasks.filter(task => !task.completed).length;

document.getElementById("taskCount").innerText =
  count + " tasks left";