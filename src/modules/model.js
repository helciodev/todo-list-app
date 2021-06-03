export const createList = (name) => ({
  id: Date.now().toString(),
  name,
  tasks: [],
});

export const createTask = (name, priority, dueDate, description, complete = false) => ({
  id: Date.now().toString(), name, priority, dueDate, description, complete,
});