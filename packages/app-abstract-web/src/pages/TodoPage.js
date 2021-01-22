import React from 'react';
import { Helmet } from 'react-helmet';
import TodoList from '../components/TodoList';

const TodoPage = () => (
  <>
    <Helmet>
      <meta name="description" content="Todo demo" />
    </Helmet>
    <TodoList />
  </>
);

export default TodoPage;
