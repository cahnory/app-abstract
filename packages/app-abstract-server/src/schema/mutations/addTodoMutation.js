import { createOne } from '../../models/Todo';

const addTodoMutation = (_root, { description }) => createOne({ description });

export default addTodoMutation;
