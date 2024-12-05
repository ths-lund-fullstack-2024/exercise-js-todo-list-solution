import { insertTodosToElement, markTodo, removeTodo } from "./domFunctions.js";
import { getTodos } from "./functions.js";
import { todoList } from "./index.js";

export function handleOnClick(event) {
  const { target } = event;

  if (target.classList.contains("todo")) markTodo(target);
  if (target.classList.contains("delete")) removeTodo(target);
}

export async function handleOnSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.todoInput.value; // Check this one out, why is elements present on the target here.

  const newTodo = {
    completed: false,
    id: crypto.randomUUID(), // crypto exists on the BOM object
    title: value,
    userId: 1,
  };

  const todosLS = await getTodos();
  const updatedTods = [newTodo, ...todosLS];
  localStorage.setItem("todos", JSON.stringify(updatedTods));
  insertTodosToElement(todoList, updatedTods);
}
