const todoInput = document.getElementById("todoInput");
const todoSubmitButton = document.getElementById("todoSubmitButton");
const errorMessage = document.getElementById("errorMessage");
const todoList = document.getElementById("todoList");
const filterButtons = document.querySelectorAll("#filters button");
const todoListArray = JSON.parse(localStorage.getItem("todos")) || [];
let editingIndex = null;
let currentFilter = 'all';

// Add or Update Todo
todoSubmitButton.addEventListener("click", () => {
    const trimmedValue = todoInput.value.trim();
    errorMessage.textContent = "";

    if (trimmedValue === "") {
        errorMessage.textContent = "Please enter something";
        return;
    }

    if (trimmedValue.length < 3) {
        errorMessage.textContent = "Please enter more than 2 characters";
        return;
    }

    if (editingIndex !== null) {
        todoListArray[editingIndex].text = trimmedValue;
        editingIndex = null;
        todoSubmitButton.textContent = "Submit Todo";
    } else {
        todoListArray.push({
            text: trimmedValue,
            completed: false
        });
        saveToLocalStorage();
    }

    todoInput.value = "";
    renderTodo();
});

// Filter Button Logic
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        renderTodo();
    });
});


function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todoListArray));
}

// Render Todo List
function renderTodo() {
    todoList.innerHTML = "";
    errorMessage.textContent = ""; // Clear errors on render

    // Handle "No Todos" state dynamically
    if (todoListArray.length === 0 && todoInput.value === "") {
        errorMessage.textContent = 'No Todos Yet';
        return;
    }

    let filteredTodos = todoListArray.filter(todo => {
        if (currentFilter === "completed") return todo.completed;
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "deletAll") { 
            todoListArray.splice(0);
            saveToLocalStorage();
            return renderTodo();
        }
        return true;
    });

    filteredTodos.forEach((item) => {
        const li = document.createElement("li");

        // Use a span for text so it doesn't interfere with buttons
        const textSpan = document.createElement("span");
        textSpan.textContent = item.text;
        if (item.completed) {
            textSpan.style.textDecoration = "line-through";
        }

        const completeButton = document.createElement("button");
        completeButton.classList.add("tickButton")
        completeButton.textContent = "✔";

        // Stop both Click and DblClick from reaching the LI
        completeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            item.completed = !item.completed;
            saveToLocalStorage();
            renderTodo();
        });
        completeButton.addEventListener("dblclick", (e) => e.stopPropagation());

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton")
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const realIndex = todoListArray.indexOf(item);
            todoListArray.splice(realIndex, 1);
            saveToLocalStorage();
            renderTodo();
        });
        deleteButton.addEventListener("dblclick", (e) => e.stopPropagation());

        // Edit logic on the LI
        li.addEventListener("dblclick", () => {
            editingIndex = todoListArray.indexOf(item);
            todoInput.value = item.text;
            todoSubmitButton.textContent = "Update";
            todoInput.focus();
        });

        li.appendChild(textSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}

// Initialize
renderTodo();


// Filter Button Logic with persistent active state
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // 1. Remove 'active' class from all sibling buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // 2. Add 'active' class to the clicked button
        button.classList.add('active');

        // 3. Update filter and render as before
        currentFilter = button.dataset.filter;
        renderTodo();
    });
});

// Initialize the "All" button as active on load
document.querySelector('[data-filter="all"]').classList.add('active');


todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        todoSubmitButton.click();
    }
});