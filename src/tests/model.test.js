import * as model from '../modules/model';

const listOne = model.createList('listOne');
const listTwo = model.createList('lisTwo');

test('listOne.id to not be equal to listTwo', () => {
	expect(listOne.name).not.toBe(listTwo.name);
});
