/**
 * @jest-environment jsdom
 */

import * as view from '../modules/view';

test('parentElement.childNodes.length to equal 0', () => {
  const parentElement = document.createElement('div');
  const childElement = document.createElement('p');

  parentElement.appendChild(childElement);
  view.clearElement(parentElement);

  expect(parentElement.childNodes.length).toEqual(0);
});

test('if priorityTask.textContent equal low class priorityTask.classList should contain text-gray-500 color ', () => {
  const priorityTask = document.createElement('div');
  priorityTask.textContent = 'low';
  view.priorityTaskColor(priorityTask);
  expect(priorityTask.classList).toContain('text-gray-500');
});

test('if priorityTask.textContent equal medium class priorityTask.classList should contain text-yellow-500 color ', () => {
  const priorityTask = document.createElement('div');
  priorityTask.textContent = 'medium';
  view.priorityTaskColor(priorityTask);
  expect(priorityTask.classList).toContain('text-yellow-500');
});

test('if priorityTask.textContent not equal medium or low class priorityTask.classList should contain text-red-500 color ', () => {
  const priorityTask = document.createElement('div');
  priorityTask.textContent = 'high';
  view.priorityTaskColor(priorityTask);
  expect(priorityTask.classList).toContain('text-red-500');
});