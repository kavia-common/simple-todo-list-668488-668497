import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './App.css';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { loadTodos, saveTodos } from './utils/storage';

// A small helper for ids
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// PUBLIC_INTERFACE
function App() {
  /** Main Todo state with localStorage persistence */
  const [todos, setTodos] = useState(() => loadTodos());

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const remainingCount = useMemo(
    () => todos.filter(t => !t.completed).length,
    [todos]
  );

  // PUBLIC_INTERFACE
  const addTodo = (text) => {
    setTodos(prev => [{ id: uid(), text, completed: false }, ...prev]);
  };

  // PUBLIC_INTERFACE
  const updateTodo = (id, nextText) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: nextText } : t)));
  };

  // PUBLIC_INTERFACE
  const toggleComplete = (id) => {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // PUBLIC_INTERFACE
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed));
  };

  return (
    <div className="app-shell">
      <div className="container">
        <Header />
        <div className="card" role="region" aria-label="Todo manager">
          <TodoForm onAdd={addTodo} />
          <ul className="todo-list" role="list" aria-label="Todo items">
            {todos.length === 0 ? (
              <li className="empty" aria-live="polite">
                Nothing here yet. Add your first task to get started.
              </li>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleComplete(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onSave={(val) => updateTodo(todo.id, val)}
                />
              ))
            )}
          </ul>
          <div className="footer-row" aria-live="polite">
            <span className="counter">{remainingCount} remaining</span>
            <button
              type="button"
              className="btn ghost"
              onClick={clearCompleted}
              aria-label="Clear completed todos"
              disabled={todos.every(t => !t.completed)}
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
