import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { stylesheet } from 'astroturf';

const TodoForm = ({ onAddTodo }) => {
  const [description, setDescription] = useState('');

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={description}
        onChange={({ target: { value } }) => setDescription(value)}
        onKeyPress={({ key }) => {
          if (key === 'Enter') {
            onAddTodo({ description });
            setDescription('');
          }
        }}
      />
    </div>
  );
};

TodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default TodoForm;

const styles = stylesheet`
  .container {
    font-weight: bold;
  }
`;
