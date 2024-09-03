// Select DOM elements
const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', manageTask);

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.innerHTML = `${taskText} <button class="delete">Delete</button>`;
    taskList.appendChild(li);
    saveTask(taskText);
    newTaskInput.value = '';
  }
}

// Manage task actions (complete/delete)
function manageTask(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
  } else if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    removeTask(li.textContent.replace('Delete', '').trim());
    li.remove();
  }
}

// Save task to local storage
function saveTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from local storage
function removeTask(task) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasks() {
  let tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

// Load tasks from local storage
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `${task} <button class="delete">Delete</button>`;
    taskList.appendChild(li);
  });
}
