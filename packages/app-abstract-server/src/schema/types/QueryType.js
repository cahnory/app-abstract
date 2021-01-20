import { readMany as readManyTodo } from '../../models/Todo';

const QueryType = {
  todoList: () => readManyTodo({ isDeleted: false }),
};

export default QueryType;
