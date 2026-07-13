// =========================
// Select page elements
// =========================
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskContainer = document.getElementById("taskContainer");

const filterAll = document.getElementById("filterAll");
const filterActive = document.getElementById("filterActive");
const filterCompleted = document.getElementById("filterCompleted");

const counter = document.getElementById("counter");

// Keep track of the current filter
let currentFilter = "all";

// =========================
// Add a new task
// =========================
function addTask() {

    const taskText = taskInput.value.trim();

    // Validate input
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task item
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    // Add task content
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="toggle-btn">✓</button>
            <button class="delete-btn">✗</button>
        </div>
    `;

    // Display task
    taskContainer.appendChild(taskItem);

    // Clear input
    taskInput.value = "";

    updateCounter();
    filterTasks(currentFilter);
}

// =========================
// Toggle completed status
// =========================
function toggleTaskStatus(taskElement) {

    taskElement.classList.toggle("completed");

    updateCounter();
    filterTasks(currentFilter);
}

// =========================
// Delete task
// =========================
function deleteTask(taskElement) {

    taskElement.remove();

    updateCounter();
    filterTasks(currentFilter);
}

// =========================
// Filter tasks
// =========================
function filterTasks(filterType) {

    currentFilter = filterType;

    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {

        if (filterType === "all") {
            task.style.display = "flex";
        }

        else if (filterType === "active") {
            task.style.display =
                task.classList.contains("completed")
                ? "none"
                : "flex";
        }

        else if (filterType === "completed") {
            task.style.display =
                task.classList.contains("completed")
                ? "flex"
                : "none";
        }

    });
}

// =========================
// Update task counter
// =========================
function updateCounter() {

    const tasks = document.querySelectorAll(".task-item");

    const total = tasks.length;

    const completed =
        document.querySelectorAll(".task-item.completed").length;

    const active = total - completed;

    counter.textContent =
        `Total: ${total} | Active: ${active} | Completed: ${completed}`;
}

// =========================
// Add task button
// =========================
addBtn.addEventListener("click", addTask);

// Add task by pressing Enter
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// =========================
// Event delegation
// =========================
taskContainer.addEventListener("click", function(event) {

    const taskItem = event.target.closest(".task-item");

    if (!taskItem) return;

    if (event.target.classList.contains("toggle-btn")) {
        toggleTaskStatus(taskItem);
    }

    if (event.target.classList.contains("delete-btn")) {
        deleteTask(taskItem);
    }

});

// =========================
// Filter buttons
// =========================
filterAll.addEventListener("click", function() {
    filterTasks("all");
});

filterActive.addEventListener("click", function() {
    filterTasks("active");
});

filterCompleted.addEventListener("click", function() {
    filterTasks("completed");
});