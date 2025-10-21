const KEY = 'ocean_todos_v1';

/**
 * PUBLIC_INTERFACE
 * Load todos from localStorage.
 * @returns {Array<{id:string,text:string,completed:boolean}>}
 */
export function loadTodos() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * Save todos to localStorage.
 * @param {Array} todos
 */
export function saveTodos(todos) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(todos));
  } catch {
    // ignore
  }
}
