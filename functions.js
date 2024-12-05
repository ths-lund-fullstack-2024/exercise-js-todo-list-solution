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
