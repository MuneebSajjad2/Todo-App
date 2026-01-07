📝 Todo App (Vanilla JavaScript)

A clean, responsive Todo application built with HTML, CSS, and Vanilla JavaScript, focusing on real-world logic, state management, and user experience.

This project demonstrates how to build a complete CRUD application without frameworks, using clear logic and modular functions.

🚀 Features

➕ Add new todos with validation

✏️ Edit todo on double-click

✅ Mark todos as completed

❌ Delete individual todos

🗂 Filter todos (All / Active / Completed)

🧹 Delete all todos

💾 Persistent data using localStorage

⌨️ Keyboard support (Enter key)

📱 Fully responsive UI

🎨 Modern glassmorphism-style UI

🧠 Core Logic Explained
1. State Management
const todoListArray = JSON.parse(localStorage.getItem("todos")) || [];
let editingIndex = null;
let currentFilter = 'all';


todoListArray stores all todos as objects:

{ text: "Learn JavaScript", completed: false }


editingIndex tracks which todo is being edited

currentFilter controls which todos are shown

2. Adding & Editing Todos

Input is trimmed and validated

Same button handles add and update

Editing mode is triggered via double-click

if (editingIndex !== null) {
    todoListArray[editingIndex].text = trimmedValue;
} else {
    todoListArray.push({ text: trimmedValue, completed: false });
}

3. Rendering Logic (Single Source of Truth)

All UI updates happen through one function:

function renderTodo() { ... }


This function:

Clears the list

Applies filtering

Creates DOM elements dynamically

Updates completion state

Syncs UI with data

This keeps the app predictable and bug-free.

4. Filtering Todos

Filtering is handled using .filter():

let filteredTodos = todoListArray.filter(todo => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "active") return !todo.completed;
    return true;
});


Each filter button updates currentFilter and re-renders the list.

5. Event Handling & UX

stopPropagation() prevents button clicks from triggering edit

Double-click on list item enters edit mode

Enter key submits todo

Active filter button state is visually highlighted

6. Local Storage Persistence
localStorage.setItem("todos", JSON.stringify(todoListArray));


Todos automatically:

Save on add, edit, delete

Restore on page reload

🎨 Styling Approach

Modern glassmorphism UI

CSS variables for easy theming

Mobile-first responsive design

Smooth hover and transition effects

CSS was accelerated using AI assistance and then fully reviewed, understood, and customized to fit the project needs.

🛠 Technologies Used

HTML5

CSS3 (Flexbox, Media Queries, Variables)

Vanilla JavaScript (ES6+)

Browser Local Storage

📌 What This Project Demonstrates

Real-world JavaScript logic

DOM manipulation without frameworks

Clean separation of concerns

Scalable structure (ready for React conversion)

Professional UI & UX thinking

🔮 Future Improvements

Drag & drop reordering

Due dates

Dark / Light theme toggle

React version of this app

👨‍💻 Author

Muneeb Sajjad
