import { markTodo } from "./domFunctions.js";

export function handleOnClick(event) {
  const { target } = event;

  if (target.classList.contains("todo")) {
    markTodo(target);
  }
}
