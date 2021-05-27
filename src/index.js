import bela from './modules/views/todoViews.js';
import ctrlr from './modules/controller.js';

bela();
ctrlr();

// create elemeents a get elements
const listContainer = document.getElementById('list-container');
const LOCAL_STORAGE_KEY = 'task.lists';
const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
const addList = document.getElementById('add-list');
const listInput = document.getElementById('list-input');
const formList = document.querySelector('[data-list-new]');

// clear element function
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(lists));
}

function renderList() {
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.setAttribute('class', 'text-2xl my-2 text-gray-100 uppercase');
    listElement.dataset.listId = list.id;
    listElement.textContent = list.name;
    listContainer.appendChild(listElement);
  });
}

function saveAndRender() {
  save();
  renderList();
}

function createList(name) {
  return { id: Date.now().toString(), name, tasks: [] };
}

formList.addEventListener('submit', (event) => {
  event.preventDefault();

  const listName = listInput.value;

  if (listName === null || listName === '') return;

  const list = createList(listName);
  listInput.value = '';
  lists.push(list);
  saveAndRender();
  console.log(lists);
});
