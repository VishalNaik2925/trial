function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Create list item
    let li = document.createElement("li");

    // Task text
    let span = document.createElement("span");
    span.textContent = taskText;
    span.addEventListener("click", function () {
        this.classList.toggle("completed");
    });

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
}
