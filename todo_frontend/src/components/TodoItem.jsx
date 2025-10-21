import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem represents a single todo with inline edit support.
 * Props:
 * - todo: { id: string, text: string, completed: boolean }
 * - onToggle(): void
 * - onDelete(): void
 * - onSave(nextText: string): void
 */
function TodoItem({ todo, onToggle, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setDraft(todo.text);
  }, [todo.text]);

  const beginEdit = () => {
    setDraft(todo.text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setIsEditing(false);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      // If empty after edit, don't save and keep editing state
      inputRef.current?.focus();
      return;
    }
    if (trimmed !== todo.text) {
      onSave(trimmed);
    }
    setIsEditing(false);
  };

  const onEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <li className="todo-item" role="listitem">
      <input
        type="checkbox"
        className="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}
      />
      {!isEditing ? (
        <div className="todo-text-wrapper" style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`} aria-label="Todo text">
            {todo.text}
          </span>
        </div>
      ) : (
        <div className="inline-edit" role="group" aria-label="Edit todo">
          <label htmlFor={`edit-${todo.id}`} className="visually-hidden">Edit todo text</label>
          <input
            id={`edit-${todo.id}`}
            ref={inputRef}
            className="input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onEditKeyDown}
            aria-describedby={`hint-${todo.id}`}
          />
          <button
            type="button"
            className="btn success"
            onClick={commitEdit}
            aria-label="Save todo"
            title="Save (Enter)"
          >
            Save
          </button>
          <button
            type="button"
            className="btn ghost"
            onClick={cancelEdit}
            aria-label="Cancel editing"
            title="Cancel (Esc)"
          >
            Cancel
          </button>
          <span id={`hint-${todo.id}`} className="visually-hidden">
            Press Enter to save or Escape to cancel
          </span>
        </div>
      )}
      <div className="todo-actions row" role="group" aria-label="Todo actions">
        {!isEditing && (
          <>
            <button
              type="button"
              className="btn secondary"
              onClick={beginEdit}
              aria-label="Edit todo"
              title="Edit"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn danger"
              onClick={onDelete}
              aria-label="Delete todo"
              title="Delete"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
