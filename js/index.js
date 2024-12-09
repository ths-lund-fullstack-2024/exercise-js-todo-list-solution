import {
  handleOnClick,
  handleOnInput,
  handleOnSubmit,
} from "./eventHandlers.js";

import { getTodos, insertTodos } from "./utils.js";

const form = document.querySelector(".form");
export const todoList = document.querySelector(".todo-list");

form.addEventListener("input", handleOnInput);
form.addEventListener("submit", handleOnSubmit);
todoList.addEventListener("click", handleOnClick);

getTodos().then((todos) => insertTodos(todoList, todos));
