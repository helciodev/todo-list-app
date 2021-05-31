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
const taskRender = document.getElementById('task-render');
let selectedList = lists[lists.length - 1] || '';

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

function createTask(name, priority, dueDate) {
  return {
    id: Date.now().toString(), name, complete: false, priority, dueDate,
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

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage['selected.list']){
    tasks.classList.remove('hidden');
    listTitle.textContent = selectedList.name;
    taskRenderFn();
  }else {
    return
  }
})  

listContainer.addEventListener('click', (event) => {
  selectedList = lists.find((list) => list.id === event.target.dataset.listId);
  save();
  console.log(selectedList);
  if (event.target.tagName.toLowerCase() === 'li') {
    tasks.classList.remove('hidden');
    listTitle.textContent = event.target.textContent;
  }
  taskRenderFn();
  console.log(selectedList);
});

function taskRenderFn() {
  clearElement(tasksList);
  selectedList.tasks.forEach((task, taskIndex) => {
    const templateElement = document.importNode(taskRender.content, true);
    const para = templateElement.querySelector('p');
    para.textContent = task.name;
    const checkbox = templateElement.querySelector('input');
    checkbox.classList.add('checked');
    checkbox.checked = task.complete;
    const edit = templateElement.getElementById('edit');
    const deleteTask = templateElement.getElementById('delete');
    [checkbox, edit, deleteTask].forEach((templateChild) => {
      templateChild.dataset.listId = taskIndex;
    })
    console.log(tasksList.lastChild);
    tasksList.appendChild(templateElement);
  });
}

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
  if (taskName === null || taskName === '') return;
  const newTask = createTask(taskName);
  taskInput.value = '';
  selectedList.tasks.push(newTask);
  save();
  taskRenderFn();
});

listContainer.addEventListener('click', (event) => {
  lists = lists.filter((list) => list.id !== event.target.dataset.element);
  saveAndRender();
});

window.addEventListener('click', (event) => {
  if (event.target.id === 'delete') {
    selectedList.tasks.splice(event.target.dataset.listId, 1);
    console.log(event.target.dataset.listId)
    save();
    taskRenderFn();
  }
})

renderLocalStorage();
