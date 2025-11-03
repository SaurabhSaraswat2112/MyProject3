// script.js

const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from local storage when the app starts
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task on button click
addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  // Error handling for empty input
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create task elements
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const taskName = document.createElement('span');
  taskName.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');

  // Event listeners for task actions
  checkbox.addEventListener('click', () => {
    taskItem.classList.toggle('completed');
    saveTasks();
  });

  deleteButton.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks();
  });

  // Append elements
  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskName);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);

  // Clear input field
  taskInput.value = '';

  // Save to local storage
  saveTasks();
}

// Save all tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(taskItem => {
    const text = taskItem.querySelector('span').textContent;
    const completed = taskItem.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) taskItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('click', () => {
      taskItem.classList.toggle('completed');
      saveTasks();
    });

    const taskName = document.createElement('span');
    taskName.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}
