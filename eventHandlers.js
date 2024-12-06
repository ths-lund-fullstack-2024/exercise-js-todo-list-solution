import { submitBtn, todoList } from "./index.js";

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

export async function handleOnInput({ target }) {
  const todosLS = await getTodos();
  const todoAlreadyExist = todosLS.some((todo) => todo.title === target.value);

  todoAlreadyExist || !target.value
    ? submitBtn.setAttribute("disabled", "true")
    : submitBtn.removeAttribute("disabled");
}

export async function handleOnSubmit(event) {
  event.preventDefault();
  const { elements } = event.target;
  const value = elements.todoInput.value;

  if (!value) return;

  const newTodo = {
    completed: false,
    id: crypto.randomUUID(),
    title: value,
    userId: 1,
  };

  const todosLS = await getTodos();
  const updatedTods = [newTodo, ...todosLS];
  saveTodos(updatedTods);
  insertTodos(todoList, updatedTods);
  event.target.reset();
  submitBtn.setAttribute("disabled", "true");
}
