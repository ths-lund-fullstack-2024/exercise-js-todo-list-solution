import { submitBtn, todoList } from "./index.js";

import {
  getTodos,
  insertTodos,
  markTodo,
  moveTodo,
  removeTodo,
  saveTodos,
} from "./utils.js";

export async function handleOnClick({ target }) {
  const todo = target.closest(".todo");
  const todos = await getTodos();
  const { classList } = target;

  if (classList.contains("delete")) removeTodo(todo, todos);
  if (classList.contains("move-down")) moveTodo(todo, todos, "DOWN");
  if (classList.contains("move-up")) moveTodo(todo, todos, "UP");
  if (classList.contains("todo")) markTodo(todo, todos);
}

export async function handleOnInput({ target }) {
  const todos = await getTodos();
  const todoAlreadyExist = todos.some((todo) => todo.title === target.value);

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

  const todos = await getTodos();
  const updatedTods = [newTodo, ...todos];
  saveTodos(updatedTods);
  insertTodos(todoList, updatedTods);
  event.target.reset();
  submitBtn.setAttribute("disabled", "true");
}
