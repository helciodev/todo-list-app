export const listInput = document.getElementById('list-input');
export const formList = document.querySelector('[data-list-new]');
export const listTitle = document.getElementById('list-title');

export const tasksList = document.getElementById('tasks-list');
export const addTask = document.getElementById('add-task');
export const taskInput = document.getElementById('task-input');
export const taskInputModal = document.getElementById('task-input-modal');
export const dueDateModal = document.getElementById('date-modal');
export const optionsModal = document.getElementById('option-modal');
export const descriptionModal = document.getElementById('description-modal');
export const saveBtnModal = document.getElementById('save-btn-modal');
export const taskRender = document.getElementById('task-render');
export const dueDate = document.getElementById('date');
export const options = document.getElementById('option');
export const description = document.getElementById('description');
export const taskCountElement = document.getElementById('task-count');
export const listContainer = document.getElementById('list-container');
export const LOCAL_STORAGE_KEY = 'task.lists';
export const LOCAL_SELECTED_LIST = 'selected.list';
export const modalParent = document.getElementById('modal-parent');

// clear element function
export const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

export const renderList = (listArr) => {
  clearElement(listContainer);
  listArr.forEach((list) => {
    const listElement = document.createElement('li');
    listElement.setAttribute('class', 'text-2xl cursor-pointer my-2 text-gray-100 uppercase');
    listElement.dataset.listId = list.id;
    listElement.textContent = list.name;
    listElement.insertAdjacentHTML('beforeend', `
  <i data-element = ${list.id} class="fa cursor-pointer fa-times-circle" aria-hidden="true"></i>`);
    listContainer.appendChild(listElement);
  });
};

export const priorityTaskColor = (priorityTask) => {
  if (priorityTask.textContent === 'low') {
    priorityTask.classList.add('text-gray-500', 'font-bold');
  } else if (priorityTask.textContent === 'medium') {
    priorityTask.classList.add('text-yellow-500', 'font-bold');
  } else {
    priorityTask.classList.add('text-red-500', 'font-bold');
  }
};

export const tasksCount = (selected) => {
  const tasksToComplete = selected.tasks.filter((task) => !task.complete === true).length;

  if (tasksToComplete === 1) {
    return `${tasksToComplete} task remaining`;
  }
  return `${tasksToComplete} tasks remaining`;
};

export const taskRenderFn = (selected) => {
  clearElement(tasksList);
  selected.tasks.forEach((task, taskIndex) => {
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
};

export const editTasks = (taskToEdit) => {
  const newTaskName = taskInputModal.value;
  if (newTaskName === null || newTaskName === '') return;
  taskToEdit.name = newTaskName;

  if (optionsModal.value !== null || optionsModal.value !== '') {
    taskToEdit.priority = optionsModal.value;
  }

  if (descriptionModal.value !== null || descriptionModal.value !== '') {
    taskToEdit.description = descriptionModal.value;
  }

  if (dueDateModal.value !== null || dueDateModal.value !== '') {
    taskToEdit.dueDate = dueDateModal.value;
  }
};

export const renderCurrentValues = (currentListTask) => {
  taskInputModal.value = currentListTask.name;
  dueDateModal.value = currentListTask.dueDate;
  optionsModal.value = currentListTask.priority;
  descriptionModal.value = currentListTask.description;
};