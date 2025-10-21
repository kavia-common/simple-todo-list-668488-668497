import React, { useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoForm allows users to add new todos.
 * Props:
 * - onAdd(text: string): void
 */
function TodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
    // Return focus to input for quick entry
    inputRef.current?.focus();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      className="form-row"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      role="form"
      aria-label="Add todo form"
      style={{ marginBottom: 14 }}
    >
      <label htmlFor="todo-input" className="visually-hidden">
        Add a new todo
      </label>
      <input
        id="todo-input"
        ref={inputRef}
        className="input"
        type="text"
        placeholder="Add a task and press Enter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        aria-required="true"
      />
      <button
        type="submit"
        className="btn"
        aria-label="Add todo"
        disabled={!text.trim()}
        title="Add todo"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
