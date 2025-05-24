const input = document.getElementById("task-input");
const addButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => {
    addTask(task.text, task.completed);
});

addButton.addEventListener("click", handleAddTask);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleAddTask();
    }
});

function handleAddTask() {
    const taskText = input.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        input.value = "";
    }
}


function addTask(text, completed = false) {
    const li = document.createElement("li");
    li.className = "task-item";
    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
    <span>${text}</span>
    <div class="task-buttons">
      <button class="complete-btn">✓</button>
      <button class="delete-btn">🗑</button>
    </div> 
      `;

    li.querySelector(".complete-btn").addEventListener("click", function () {
        li.classList.toggle("completed");
        updateStorage();

    });

    li.querySelector(".delete-btn").addEventListener("click", function () {
        li.remove();
        updateStorage();

    });

    taskList.appendChild(li);
    updateStorage();

}

function updateStorage() {
    const currentTasks = [];
    document.querySelectorAll(".task-item").forEach(li => {
        const text = li.querySelector("span").textContent;
        const completed = li.classList.contains("completed");
        currentTasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(currentTasks));
}