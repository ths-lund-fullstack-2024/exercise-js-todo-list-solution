import { todoList } from "./index.js";

import {
  getTodos,
  insertTodos,
  markTodo,
  removeTodo,
  saveTodos,
} from "./utils.js";

export function handleOnClick({ target }) {
  if (target.classList.contains("todo")) markTodo(target);
  if (target.classList.contains("delete")) removeTodo(target);
}

export async function handleOnSubmit(event) {
  event.preventDefault();
  const { elements } = event.target;
  const value = elements.todoInput.value; // Check this one out, why is "elements" present on the target here.

  const newTodo = {
    completed: false,
    id: crypto.randomUUID(), // crypto exists on the BOM object
    title: value,
    userId: 1,
  };

  const todosLS = await getTodos();
  const updatedTods = [newTodo, ...todosLS];
  saveTodos(updatedTods);
  insertTodos(todoList, updatedTods);
}
