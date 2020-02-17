import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, deleteTodo, onToggle}) => (
  <li className="todo-item">
    <span
      onClick={onToggle}
      style={{textDecoration: completed? 'line-through' : 'none'}}
      >
      {name}
    </span>
    <span
      className="delete-todo"
      onClick={deleteTodo}
      > X </span>
  </li>
)

export default TodoItem;
