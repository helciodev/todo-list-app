// create elements a get elements

const listContainer = document.getElementById('list-container');
const LOCAL_STORAGE_KEY = 'task.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
// const addList = document.getElementById('add-list');
const listInput = document.getElementById('list-input');
const formList = document.querySelector('[data-list-new]');
const listTitle = document.getElementById('list-title');
const tasks = document.getElementById('tasks');
const tasksList = document.getElementById('tasks-list');
const addTask = document.getElementById('add-tasks');
const taskInput = document.getElementById('task-input');
let currentList = lists[lists.length - 1];

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
    tasks: [
      {
        id: 'sdfddf',
        name: 'task one',
        complete: false,
      },
    ],
  };
}

// function createTask (name){
//   return { id: , name, complete:false, priority:'low' }
// }
function save() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
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
function saveAndRender() {
  save();
  renderList();
  listTitleRender();
  taskRenderFn();
}

function listTitleRender() {
  if (localStorage) {
    tasks.classList.remove('hidden');
    listTitle.textContent = lists[lists.length - 1].name;
  }
}

function taskRenderFn() {
  currentList.tasks.forEach((task) => {
    const taskRender = document.importNode(taskRender.content, true);
    const paragraph = taskRender.querySelector('p');
    paragraph.textContent = task.name;
    const firstI = taskRender.getElementById('first-i');
    const secondI = taskRender.getElementById('second-i');
    const thirdI = taskRender.getElementById('third-i')
      [firstI, secondI, thirdI].forEach((icon) => {
        icon.datasetTaskId = task.id;
      });
    tasksList.appendChild(taskRender);
  });
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

listContainer.addEventListener('click', (event) => {
  lists = lists.filter((list) => list.id !== event.target.dataset.element);
  saveAndRender();
});

// listtitle change textcontent on list click
listContainer.addEventListener('click', (event) => {
  currentList = lists.filter((list) => list.id === event.target.dataset.listId);
  if (event.target.tagName === 'LI') {
    listTitle.textContent = event.target.textContent;
  }
  console.log(currentList);
  console.log(lists);
});

renderLocalStorage();
