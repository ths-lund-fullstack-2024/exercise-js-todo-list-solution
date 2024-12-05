import { insertTodosToElement } from "./domFunctions.js";
import { handleOnClick, handleOnSubmit } from "./eventHandlers.js";
import { getTodos } from "./functions.js";

const form = document.querySelector(".form");
export const todoList = document.querySelector(".todo-list");

form.addEventListener("submit", handleOnSubmit);
todoList.addEventListener("click", handleOnClick);

getTodos().then((todos) => insertTodosToElement(todoList, todos));
