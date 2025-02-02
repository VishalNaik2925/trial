// Load tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");

    // Task text
    let span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", function () {
        this.classList.toggle("completed");
        saveTasks();
    });

    // Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", function () {
        let newText = prompt("Edit your task:", span.textContent);
        if (newText) {
            span.textContent = newText;
            saveTasks();
        }
    });

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
    taskInput.value = "";
}

// Save tasks to local storage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        let tasks = JSON.parse(storedTasks);
        let taskList = document.getElementById("taskList");

        tasks.forEach(task => {
            let li = document.createElement("li");

            let span = document.createElement("span");
            span.textContent = task.text;
            if (task.completed) span.classList.add("completed");
            span.addEventListener("click", function () {
                this.classList.toggle("completed");
                saveTasks();
            });

            let editBtn = document.createElement("button");
            editBtn.textContent = "✏️";
            editBtn.classList.add("edit-btn");
            editBtn.addEventListener("click", function () {
                let newText = prompt("Edit your task:", span.textContent);
                if (newText) {
                    span.textContent = newText;
                    saveTasks();
                }
            });

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(span);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }
}

// Filter tasks
function filterTasks(filter) {
    document.querySelectorAll("#taskList li").forEach(li => {
        let isCompleted = li.querySelector("span").classList.contains("completed");

        if (filter === "completed" && !isCompleted) {
            li.style.display = "none";
        } else if (filter === "pending" && isCompleted) {
            li.style.display = "none";
        } else {
            li.style.display = "flex";
        }
    });
}

// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});
