import { todoList } from "./index.js";

import {
  getTodos,
  insertTodos,
  markTodo,
  moveTodo,
  removeTodo,
  saveTodos,
} from "./utils.js";

const submitBtn = document.querySelector(".btn");
const todoInput = document.querySelector('input[name="todoInput"]');
const authorInput = document.querySelector('input[name="authorInput"]');

export async function handleOnClick({ target }) {
  const todo = target.closest(".todo");
  const todos = await getTodos();
  const { classList } = target;

  if (classList.contains("delete")) return removeTodo(todo, todos);
  if (classList.contains("move-down")) return moveTodo(todo, todos, "DOWN");
  if (classList.contains("move-up")) return moveTodo(todo, todos, "UP");
  return markTodo(todo, todos);
}

export async function handleOnInput() {
  const todos = await getTodos();
  const todoValue = todoInput.value;
  const authorValue = authorInput.value;

  const todoAlreadyExist = todos.some(
    (t) => t.title === todoValue && t.author === authorValue
  );

  todoAlreadyExist || !todoValue
    ? submitBtn.setAttribute("disabled", "true")
    : submitBtn.removeAttribute("disabled");
}

export async function handleOnSubmit(event) {
  event.preventDefault();
  const value = todoInput.value;

  if (!value) return;

  const newTodo = {
    author: authorInput.value || "Anon",
    completed: false,
    id: crypto.randomUUID(),
    title: value,
    timestamp: new Date().toLocaleString(),
    userId: 1,
  };

  const todos = await getTodos();
  const updatedTods = [newTodo, ...todos];
  saveTodos(updatedTods);
  insertTodos(todoList, updatedTods);
  event.target.reset();
  submitBtn.setAttribute("disabled", "true");
}
