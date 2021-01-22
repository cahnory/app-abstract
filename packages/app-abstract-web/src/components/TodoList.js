import React from 'react';
import { stylesheet } from 'astroturf';
import { gql, useMutation, useQuery } from '@apollo/client';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { loading, error, data } = useQuery(TODO_LIST_QUERY);
  const [addTodo] = useMutation(ADD_TODO_MUTATION, {
    update(cache, { data: { addTodo: newTodo } }) {
      cache.modify({
        fields: {
          todoList(todoList = []) {
            cache.writeQuery({
              query: TODO_LIST_QUERY,
              data: {
                todoList: [...todoList, cache],
              },
            });
          },
        },
      });
    },
  });

  return (
    <div className={styles.todoList}>
      {loading && 'Loading todo list…'}
      {error}
      {data && 'Todo list loaded'}
      <TodoForm
        onAddTodo={(newTodo) => {
          addTodo({
            variables: newTodo,
          });
        }}
      />
      {data?.todoList?.map((todo) => (
        <div className={styles.todoList__item} key={todo.id}>
          <TodoItem todo={todo} />
        </div>
      ))}
    </div>
  );
};

export default TodoList;

const TODO_LIST_QUERY = gql`
  query TodoList {
    todoList {
      id
      ...TodoItemTodo
    }
  }
  ${TodoItem.fragments.todo}
`;

const ADD_TODO_MUTATION = gql`
  mutation AddTodo($description: String!) {
    addTodo(description: $description) {
      id
      description
      isComplete
    }
  }
`;

const styles = stylesheet`
  .todoList {
  }
  .todoList__item {
    margin: 8px 0;
  }
`;
