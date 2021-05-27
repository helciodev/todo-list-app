// create elements a get elements

const listContainer = document.getElementById('list-container');
const LOCAL_STORAGE_KEY = 'task.lists';
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
// const addList = document.getElementById('add-list');
const listInput = document.getElementById('list-input');
const formList = document.querySelector('[data-list-new]');

// clear element function
function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function createList(name) {
  return { id: Date.now().toString(), name, tasks: [] };
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

renderLocalStorage();
