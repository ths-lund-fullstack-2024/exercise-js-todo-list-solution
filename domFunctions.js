import { getTodos } from "./functions.js";

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

export function insertTodosToElement(element, todos) {
  const todosHTMLString = todos
    .map((todo) => createTodoHTMLString(todo))
    .join("");

  element.innerHTML = todosHTMLString;
}

export async function markTodo(todoEl) {
  todoEl.classList.toggle("done");
  const todosLS = await getTodos();

  const updatedTodos = todosLS.map((todo) => {
    console.log(todo.id, todoEl.id);

    if (todo.id === parseInt(todoEl.id)) {
      return { ...todo, completed: !todo.completed };
    }

    return todo;
  });

  console.log(updatedTodos);

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
