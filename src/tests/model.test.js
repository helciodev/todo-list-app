import * as model from '../modules/model';

const list = model.createList('myList');
const task = model.createTask('myTask', 'medium');

test('typeof list.name to equal string', () => {
  expect(typeof list.name).toBe('string');
});

test('list.tasks.length to equal 0',() => {
  expect(list.tasks.length).toBe(0);
});

test('typeof list.tasks to equal object',() => {
  expect(typeof list.tasks).toBe('object');
});

test('typeof task.name to equal string', () => {
  expect(typeof task.name).toBe('string');
});

test('typeof task.priority to equal string',() => {
  expect(typeof task.priority).toBe('string');
});

test('typeof list.tasks to equal object',() => {
  expect(typeof task.complete).toBe('boolean');
});


