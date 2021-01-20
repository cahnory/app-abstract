const todoList = [
  { id: 1, isDeleted: false, isComplete: false, description: 'add new todo' },
  { id: 2, isDeleted: false, isComplete: true, description: 'complete a todo' },
];
let nextTodoId = 3;

export const createOne = ({ description, isComplete = false }) => {
  const todo = { id: nextTodoId, description, isComplete, isDeleted: false };
  todoList.push(todo);
  nextTodoId += 1;

  return todo;
};

export const readOne = (id) => todoList.find((todo) => todo.id === id);

export const readMany = ({ isComplete, isDeleted }) =>
  todoList.filter(
    (todo) =>
      todo.isComplete === (isComplete ?? todo.isComplete) &&
      todo.isDeleted === (isDeleted ?? false),
  );

export const updateOne = (id, updates) => {
  let todo = readOne(id);

  if (todo) {
    todo = { ...todo, updates, id };
  }

  return todo;
};

export const deleteOne = (id) => {
  const index = todoList.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todoList.splice(index, 1);
    return id;
  }

  return null;
};
