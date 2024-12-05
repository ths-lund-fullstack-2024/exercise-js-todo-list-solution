import { insertTodosToElement } from "./domFunctions.js";
import { handleOnClick } from "./eventHandlers.js";
import { getTodos } from "./functions.js";

const todoList = document.querySelector(".todo-list");

todoList.addEventListener("click", handleOnClick);

getTodos().then((todos) => insertTodosToElement(todoList, todos));
