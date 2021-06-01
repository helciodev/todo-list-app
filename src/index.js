// create elements a get elements

const listContainer = document.getElementById('list-container');
const LOCAL_STORAGE_KEY = 'task.lists';
const LOCAL_SELECTED_LIST = 'selected.list';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
// const addList = document.getElementById('add-list');
const listInput = document.getElementById('list-input');
const formList = document.querySelector('[data-list-new]');
const listTitle = document.getElementById('list-title');
const tasks = document.getElementById('tasks');
const tasksList = document.getElementById('tasks-list');
const addTask = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskInputModal = document.getElementById('task-input-modal');
const dueDateModal = document.getElementById('date-modal');
const optionsModal = document.getElementById('option-modal');
const descriptionModal = document.getElementById('description-modal');
const saveBtnModal = document.getElementById('save-btn-modal');
const taskRender = document.getElementById('task-render');
const dueDate = document.getElementById('date');
const options = document.getElementById('option');
const description = document.getElementById('description');
const taskCountElement = document.getElementById('task-count');
let selectedList = lists[lists.length - 1] || '';
const modalParent = document.getElementById('modal-parent');
// JSON.parse(localStorage.getItem(LOCAL_SELECTED_LIST)

// clear element function
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
tasks.classList.remove('.hidden');
function createList(name) {
  return {
    id: Date.now().toString(),
    name,
    tasks: [],
  };
}

function createTask(name, priority, dueDate, description) {
  return {
    id: Date.now().toString(), name, complete: false, description, dueDate, priority,
  };
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
  localStorage.setItem(LOCAL_SELECTED_LIST, JSON.stringify(selectedList));
}

function renderList() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.setAttribute('class', 'text-2xl cursor-pointer my-2 text-gray-100 uppercase');
    listElement.dataset.listId = list.id;
    listElement.textContent = list.name;
    listElement.insertAdjacentHTML('beforeend', `
    <i data-element = ${list.id} class="fa cursor-pointer fa-times-circle" aria-hidden="true"></i>`);
    listContainer.appendChild(listElement);
  });
}

function renderLocalStorage() {
  if (localStorage) renderList();
}

// document.addEventListener('DOMContentLoaded', () => {
//   if (localStorage['selected.list']){
//     tasks.classList.remove('hidden');
//     listTitle.textContent = selectedList.name;
//     taskRenderFn();
//   }else {
//     return
//   }
// })
function priorityTaskColor(priorityTask) {
  if (priorityTask.textContent === 'low') {
    priorityTask.classList.add('text-gray-500', 'font-bold');
  } else if (priorityTask.textContent === 'medium') {
    priorityTask.classList.add('text-yellow-500', 'font-bold');
  } else {
    priorityTask.classList.add('text-red-500', 'font-bold');
  }
}

function taskRenderFn() {
  clearElement(tasksList);
  selectedList.tasks.forEach((task, taskIndex) => {
    const templateElement = document.importNode(taskRender.content, true);
    const paraOne = templateElement.querySelector('#task-title');
    paraOne.textContent = task.name;
    const dueDateDisplay = templateElement.getElementById('due-date-display');
    dueDateDisplay.textContent = task.dueDate;
    const prioryDisplay = templateElement.getElementById('priority-display');
    prioryDisplay.textContent = task.priority;
    priorityTaskColor(prioryDisplay);
    const paraTwo = templateElement.querySelector('#description-para');
    paraTwo.textContent = task.description;
    const checkbox = templateElement.querySelector('input');
    checkbox.classList.add('checked');
    checkbox.checked = task.complete;
    const edit = templateElement.getElementById('edit');
    const deleteTask = templateElement.getElementById('delete');
    [checkbox, edit, deleteTask].forEach((templateChild) => {
      templateChild.dataset.taskIndex = taskIndex;
    });
    tasksList.appendChild(templateElement);
  });
}

function tasksCount() {
  const tasksToComplete = selectedList.tasks.filter((task) => !task.complete === true).length;

  if (tasksToComplete === 1) {
    return `${tasksToComplete} task remaining`;
  }
  return `${tasksToComplete} tasks remaining`;
}

console.log(tasksCount());

listContainer.addEventListener('click', (event) => {
  selectedList = lists.find((list) => list.id === event.target.dataset.listId);
  save();

  if (event.target.tagName.toLowerCase() === 'li') {
    tasks.classList.remove('hidden');
    listTitle.textContent = event.target.textContent;
    taskCountElement.textContent = tasksCount();
  }
  taskRenderFn();
});

function saveAndRender() {
  save();
  renderList();
}

formList.addEventListener('submit', (event) => {
  event.preventDefault();
  const listName = listInput.value;

  if (listName === null || listName === '') return;

  const list = createList(listName);
  listInput.value = '';
  lists.push(list);
  saveAndRender();
});

addTask.addEventListener('click', () => {
  const taskName = taskInput.value;
  const due = dueDate.value;
  const desc = description.value;
  const optsPriority = options.value;
  if (taskName === null || taskName === '') return;
  const newTask = createTask(taskName, optsPriority, due, desc);
  taskInput.value = '';
  description.value = '';
  dueDate.value = null;
  selectedList.tasks.push(newTask);
  save();
  taskRenderFn();
  taskCountElement.textContent = tasksCount();
});

listContainer.addEventListener('click', (event) => {
  lists = lists.filter((list) => list.id !== event.target.dataset.element);
  saveAndRender();
});

window.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    selectedList.tasks.splice(event.target.dataset.listId, 1);
    save();
    taskRenderFn();
  } else if (event.target.id === 'checkbox') {
    if (event.target.checked) {
      selectedList.tasks[event.target.dataset.taskIndex].complete = true;
    } else {
      selectedList.tasks[event.target.dataset.taskIndex].complete = false;
    }
    save();
    renderList();
    taskRenderFn();
    taskCountElement.textContent = tasksCount();
  } else if (event.target.id === 'edit' || event.target.id === 'close-btn') {
    modalParent.classList.toggle('center');
    // newTaskName
    // if (taskName === null || taskName === '') return;
  }
});

renderLocalStorage();
