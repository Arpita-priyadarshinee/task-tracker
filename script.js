let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// Dark Mode Toggle
document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  
  // Task Logic Below (as already implemented)
  
function showNotification(message) {
  alert(message);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(task => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";

    const text = document.createElement("span");
    text.textContent = task.text;
    text.onclick = () => toggleTask(index);

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";
    del.onclick = () => deleteTask(index);

    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (!taskText) {
    showNotification("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, done: false });
  input.value = "";
  saveTasks();
  renderTasks();
  showNotification("Task added!");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showNotification("Task deleted!");
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  renderTasks(type);
}

renderTasks(); // Initial load
