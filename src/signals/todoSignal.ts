import { effect, signal } from "@preact/signals-react";

import { Todo, TodoState } from "@app/types";

/**
 * Load todos from local storage if available.
 */
const loadTodosFromLocalStorage = (): TodoState => {
  try {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsed = JSON.parse(storedTodos);
      if (Array.isArray(parsed)) {
        return { todos: parsed, loading: false, error: null }; // Ensure todos is always an array
      }
    }
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
  }
  return { todos: [], loading: false, error: null }; // Always return a valid object
};

/**
 * Signal to manage the state of todos.
 */
export const todoState = signal<TodoState>(loadTodosFromLocalStorage());

/**
 * Function to get specific todo item by id.
 *
 * @param id - The id of the todo item to be retrieved.
 *
 * @returns {Todo | undefined} The todo item with the specified id, or undefined if not found.
 */
export const getSpecificTodo = (id: number): Todo | undefined => {
  const todo = todoState.value.todos.find((todo) => todo.id === id);
  return todo;
};

/**
 * Function to get todos based on a specific condition.
 *
 * @param conditionCb - A callback function to filter todos based on a condition.
 *
 * @returns {Todo[]} An array of todos that match the condition.
 */
export const getTodosWithCondition = (
  conditionCb: (todo: Todo) => boolean
): Todo[] => {
  const completedTodos = todoState.value.todos.filter(conditionCb);
  return completedTodos;
};

/**
 * Function to add a new todo item.
 *
 * @param text - The text of the todo item to be added.
 */
export const addTodo = (text: string) => {
  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };
  todoState.value = {
    ...todoState.value,
    todos: [...todoState.value.todos, newTodo],
  };
};

/**
 * Function to update the text of an existing todo item.
 *
 * @param id - The id of the todo item to be updated.
 * @param text - The new text for the todo item.
 */
export const updateTodoText = (id: number, text: string) => {
  todoState.value = {
    ...todoState.value,
    todos: todoState.value.todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    ),
  };
};

/**
 * Function to toggle the completion status of a todo item.
 *
 * @param id - The id of the todo item to be toggled.
 */
export const toggleTodo = (id: number) => {
  todoState.value = {
    ...todoState.value,
    todos: todoState.value.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  };
};

/**
 * Function to remove a todo item.
 *
 * @param id - The id of the todo item to be removed.
 */
export const removeTodo = (id: number) => {
  const todos = todoState.value.todos.filter((todo) => todo.id !== id);
  todoState.value = {
    ...todoState.value,
    todos,
  };
};

/**
 * Effect to automatically save todos to local storage whenever todoState changes.
 */
effect(() => {
  if (!todoState?.value?.todos?.length) return; // Avoid saving empty todos
  try {
    localStorage.setItem("todos", JSON.stringify(todoState.value.todos));
  } catch (error) {
    console.error("Failed to save todos to local storage:", error);
  }
});

/**
 * Effect to sync state if `localStorage` changes (e.g., across tabs).
 */
effect(() => {
  const syncTodos = (event: StorageEvent) => {
    if (event.key === "todos") {
      todoState.value = loadTodosFromLocalStorage();
    }
  };

  window.addEventListener("storage", syncTodos);
  return () => window.removeEventListener("storage", syncTodos);
});
