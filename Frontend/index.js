const API_URL = "http://localhost:8080/api/tasks";

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

async function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskValue = taskInput.value.trim();

    if (taskValue === "") {
        alert("Task cannot be empty!");
        return;
    }

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: taskValue }),
        });

        if (!response.ok) throw new Error("Failed to add task");

        taskInput.value = "";
        loadTasks();
    } catch (error) {
        console.error(error);
    }
}

async function loadTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    try {
        let response = await fetch(API_URL);
        let tasks = await response.json();

        tasks.forEach((task) => {
            let li = document.createElement("li");
            li.innerHTML = `
                <span>${task.title}</span>
                <div>
                    <button class="edit" onclick="editTask('${task._id}', '${task.title}')">Edit</button>
                    <button class="delete" onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}

async function editTask(id, oldTask) {
    let newTask = prompt("Edit task:", oldTask);

    if (newTask !== null && newTask.trim() !== "") {
        try {
            let response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTask.trim() }),
            });

            if (!response.ok) throw new Error("Failed to update task");

            loadTasks();
        } catch (error) {
            console.error(error);
        }
    }
}

async function deleteTask(id) {
    try {
        let response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!response.ok) throw new Error("Failed to delete task");

        loadTasks();
    } catch (error) {
        console.error(error);
    }
}
