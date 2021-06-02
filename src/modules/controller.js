import * as model from './model';
import * as view from './view';

export default function init() {
  // create elements a get elements

  let lists = JSON.parse(localStorage.getItem(view.LOCAL_STORAGE_KEY)) || [
    {
      id: Date.now().toString(),
      name: 'default',
      tasks: [],
    },
  ];
  let selectedList = lists[lists.length - 1] || '';
  const tasks = document.getElementById('tasks');
  tasks.classList.remove('.hidden');

  const save = () => {
    localStorage.setItem(view.LOCAL_STORAGE_KEY, JSON.stringify(lists));
    localStorage.setItem(view.LOCAL_SELECTED_LIST, JSON.stringify(selectedList));
  };

  view.renderList(lists);

  view.taskRenderFn(selectedList);

  const renderLocalStorage = () => {
    if (localStorage) {
      view.renderList(lists);
      view.taskRenderFn(selectedList);
    }
  };

  view.listContainer.addEventListener('click', (event) => {
    selectedList = lists.find((list) => list.id === event.target.dataset.listId);
    save();

    if (event.target.tagName.toLowerCase() === 'li') {
      tasks.classList.remove('hidden');
      view.listTitle.textContent = event.target.textContent;
      view.taskCountElement.textContent = view.tasksCount(selectedList);
    }
    view.taskRenderFn(selectedList);
  });

  const saveAndRender = () => {
    save();
    view.renderList(lists);
  };

  view.formList.addEventListener('submit', (event) => {
    event.preventDefault();
    const listName = view.listInput.value;

    if (listName === null || listName === '') return;

    const list = model.createList(listName);
    view.listInput.value = '';
    lists.push(list);
    saveAndRender();
  });

  view.addTask.addEventListener('click', () => {
    const taskName = view.taskInput.value;
    const due = view.dueDate.value;
    const desc = view.description.value;
    const optsPriority = view.options.value;
    if (taskName === null || taskName === '') return;
    const newTask = model.createTask(taskName, optsPriority, due, desc);
    view.taskInput.value = '';
    view.description.value = '';
    view.dueDate.value = null;
    selectedList.tasks.push(newTask);
    save();
    view.taskRenderFn(selectedList);
    view.taskCountElement.textContent = view.tasksCount(selectedList);
  });

  view.listContainer.addEventListener('click', (event) => {
    lists = lists.filter((list) => list.id !== event.target.dataset.element);
    saveAndRender();
  });

  window.addEventListener('click', (event) => {
    if (event.target.id === 'delete') {
      selectedList.tasks.splice(event.target.dataset.taskIndex, 1);
      save();
      view.taskRenderFn(selectedList);
      view.taskCountElement.textContent = view.tasksCount(selectedList);
    } else if (event.target.id === 'checkbox') {
      if (event.target.checked) {
        selectedList.tasks[event.target.dataset.taskIndex].complete = true;
      } else {
        selectedList.tasks[event.target.dataset.taskIndex].complete = false;
      }
      save();
      view.renderList(lists);
      view.taskRenderFn(selectedList);
      view.taskCountElement.textContent = view.tasksCount(selectedList);
    } else if (event.target.id === 'edit' || event.target.id === 'close-btn') {
      view.modalParent.classList.toggle('center');
      view.renderCurrentValues(selectedList.tasks[event.target.dataset.taskIndex]);
      view.saveBtnModal.addEventListener('click', () => {
        view.editTasks(selectedList.tasks[event.target.dataset.taskIndex]);
        view.modalParent.classList.toggle('center');
        view.taskRenderFn(selectedList);
        save();
      });
    }
  });

  renderLocalStorage();
}
