import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from './redux/todoSlice';
import './App.css';

function App() {
  const { todos, loading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    dispatch(addTodo(newTodo));
    setNewTodo('');
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const sortedTodos = [...todos].sort((a, b) => a.completed - b.completed);

  return (
    <div className="App">
      <h1>Todo List</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul className="todo-list">
        {sortedTodos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              className={`todo-text ${todo.completed ? 'todo-completed' : ''}`}
              onClick={() => handleToggle(todo.id)}
            >
              {todo.text}
            </span>
            <div className="todo-actions">
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default App;
