import Modal from "./modal.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const defaultTodos = [
  {
    text: "Learn Cypress",
    completed: false,
  },
  {
    text: "Learn React",
    completed: false,
  },
]

localStorage.setItem("todos", JSON.stringify(defaultTodos));

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// add todo
function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    const btnUpdate = document.createElement("div");
    const btnClose = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    btnUpdate.classList.add("update");
    btnClose.classList.add("close");

    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;
    todoEl.appendChild(checkbox);

    checkbox.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    btnClose.addEventListener("click", () => {
      todoEl.remove();
      updateLS();
    });

    btnUpdate.addEventListener("click", () => {
      const modal = new Modal({
        title: "Update todo",
        content: `<input type="text" class="input-modal" id="input-modal" value="${todoText}">`,
        onSubmit: (newTodo) => {
          todoEl.innerText = newTodo && newTodo.trim() ? newTodo : todoText;
          todoEl.appendChild(btnUpdate);
          todoEl.appendChild(btnClose);
          updateLS();
        }
      });
      modal.show();
    });
    
    todoEl.appendChild(btnUpdate);
    todoEl.appendChild(btnClose);
    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}

//update local storage
function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}