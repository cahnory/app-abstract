import React from 'react';
import PropTypes from 'prop-types';
import { stylesheet } from 'astroturf';
import { gql } from '@apollo/client';
import { setComponentFragments } from '../utils/graphql';

const TodoItem = ({ todo }) => {
  return <div className={styles.todoItem}>{todo.description}</div>;
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

setComponentFragments(TodoItem, {
  todo: gql`
    fragment TodoItemTodo on Todo {
      description
      isComplete
    }
  `,
});

export default TodoItem;

const styles = stylesheet`
  .todoItem {
    border: 1px solid #DDD;
    border-radius: 4px;
    padding: 8px;
  }
`;
