let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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