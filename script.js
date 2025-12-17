console.log('Code is Poetry');

// Simple task manager with persistence and improved UI interactions
const taskInput = () => document.getElementById('taskInput');
const taskListEl = () => document.getElementById('taskList');
const emptyMsg = () => document.getElementById('emptyMsg');

let tasks = [];

function saveTasks() {
    localStorage.setItem('todo.tasks', JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const raw = localStorage.getItem('todo.tasks');
        tasks = raw ? JSON.parse(raw) : [];
    } catch (e) {
        tasks = [];
    }
}

function renderTasks() {
    const list = taskListEl();
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        const li = document.createElement('li');
        if (t.completed) li.classList.add('completed');

        const left = document.createElement('div');
        left.className = 'task-left';

        const text = document.createElement('span');
        text.className = 'task-text';
        text.innerText = t.text;
        left.appendChild(text);

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete';
        completeBtn.innerText = t.completed ? 'Undo' : 'Complete';
        completeBtn.addEventListener('click', () => toggleComplete(i));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.innerText = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(i));

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(left);
        li.appendChild(actions);
        list.appendChild(li);
    });

    if (emptyMsg()) emptyMsg().style.display = tasks.length ? 'none' : 'block';
    saveTasks();
}

function addTask() {
    const input = taskInput();
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    tasks.unshift({ text, completed: false });
    input.value = '';
    renderTasks();
    input.focus();
}

function toggleComplete(index) {
    if (tasks[index]) tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function clearAll() {
    if (!confirm('Clear all tasks?')) return;
    tasks = [];
    renderTasks();
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    renderTasks();

    const addButton = document.getElementById('addButton');
    const form = document.getElementById('taskForm');
    const clearAllButton = document.getElementById('clearAllButton');

    if (addButton) addButton.addEventListener('click', addTask);
    if (form) form.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask();
    });
    if (taskInput()) taskInput().addEventListener('keydown', function(e) {
        if (e.key === 'Enter') addTask();
    });
    if (clearAllButton) clearAllButton.addEventListener('click', clearAll);
});