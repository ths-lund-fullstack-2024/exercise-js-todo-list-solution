import { todoList } from "./index.js";

async function getDummyTodos() {
  try {
    const res = await fetch("http://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();
    return todos.slice(1, 4);
  } catch (error) {
    return {
      error: "Something went wrong with your request",
      todos: [],
    };
  }
}

export async function getTodos() {
  const key = "todos";
  const todosLS = JSON.parse(localStorage.getItem(key));

  if (!todosLS) {
    console.log("LS empty, fetch from API..");
    const todos = await getDummyTodos();
    localStorage.setItem(key, JSON.stringify(todos));
    return todos;
  }

  return todosLS;
}

function createTodoHTMLString(todo) {
  let todoClasses = "todo";
  if (todo.completed) todoClasses += " done";

  return /*html*/ `
    <article class="${todoClasses}" id="${todo.id}">
      <div class="title">${todo.title}</div>
      <div class="actions">
        <span class="delete icon material-symbols-outlined">
            delete
        </span>
        <div class="move">
          <span class="move-up icon material-symbols-outlined">
            keyboard_double_arrow_up
          </span>
          <span class="move-down icon material-symbols-outlined">
            keyboard_double_arrow_down
          </span>
        </div>
      </div>
    </article>
  `;
}

export function insertTodos(element, todos) {
  const todosHTMLString = todos
    .map((todo) => createTodoHTMLString(todo))
    .join("");

  element.innerHTML = todosHTMLString;
}

export function markTodo(todoToMark, todos) {
  const updatedTodos = todos.map((todo) => {
    if (todo.id == todoToMark.id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });

  saveTodos(updatedTodos);
}

export function moveTodo(todoToMove, todos, direction) {
  const index = todos.findIndex((todo) => todo.id == todoToMove.id);

  if (direction === "UP" && index > 0)
    [todos[index - 1], todos[index]] = [todos[index], todos[index - 1]];

  if (direction === "DOWN" && index < todos.length - 1)
    [todos[index], todos[index + 1]] = [todos[index + 1], todos[index]];

  saveTodos(todos);
}

export function removeTodo(todoToRemove, todos) {
  const id = todoToRemove.id;
  const filteredTodos = todos.filter((todo) => todo.id != id);
  saveTodos(filteredTodos);
}

export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
  insertTodos(todoList, todos);
}
