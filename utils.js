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

export async function markTodo(todoEl) {
  const todosLS = await getTodos();

  const updatedTodos = todosLS.map((todo) => {
    if (todo.id == todoEl.id) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });

  saveTodos(updatedTodos);
  insertTodos(todoList, updatedTodos);
}

export async function removeTodo(targetEl) {
  const todo = targetEl.closest(".todo");
  const id = todo.id;
  const todosLS = await getTodos();
  const filteredTodos = todosLS.filter((todo) => todo.id != id);
  saveTodos(filteredTodos);
  insertTodos(todoList, filteredTodos);
}

export function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
