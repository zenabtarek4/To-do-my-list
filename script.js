const API_URL = "https://dummyjson.com/docs/products";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

async function getTasks() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        taskList.innerHTML = "";

        data.todos.slice(0, 5).forEach(task => {

            displayTask(task);

        });

    } catch (error) {

        console.log("Error:", error);

    }
}
function displayTask(task) {

    const div = document.createElement("div");

    div.classList.add("task");

    div.innerHTML = `

        <span class="task-text">
            ${task.todo}
        </span>

        <div class="buttons">

            <button 
                class="edit-btn"
                onclick="editTask(${task.id})">
                ✏️
            </button>

            <button 
                class="delete-btn"
                onclick="deleteTask(${task.id})">
                🗑️
            </button>

        </div>

    `;

    taskList.appendChild(div);
}
async function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task");

        return;
    }


    try {

        const response = await fetch(
            `${API_URL}/add`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    todo: taskText,

                    completed: false,

                    userId: 1

                })
            }
        );


        const newTask = await response.json();


        displayTask(newTask);


        taskInput.value = "";


    } catch (error) {

        console.log("Error:", error);

    }
}
async function editTask(id) {

    const newTask = prompt("Enter new task:");

    if (!newTask) {
        return;
    }


    try {

        const response = await fetch(

            `${API_URL}/${id}`,

            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    todo: newTask

                })
            }

        );
        const updatedTask = await response.json();
        getTasks();
    } catch (error) {

        console.log("Error:", error);

    }
}
async function deleteTask(id) {

    try {

        await fetch(

            `${API_URL}/${id}`,

            {
                method: "DELETE"
            }

        );


        getTasks();


    } catch (error) {

        console.log("Error:", error);

    }
}
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});
getTasks();



