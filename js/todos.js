import Modal from "./modal.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

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
    // Create Element for Todo
    const todoEl = document.createElement("li");
    const btnUpdate = document.createElement("div");
    const btnClose = document.createElement("div");
    const checkbox = document.createElement("input");

    // Asign attributes
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    btnUpdate.classList.add("update");
    btnClose.classList.add("close");

    // If Completed add class completed
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    // Add text to todo and the checkbox
    todoEl.innerText = todoText; 

    // OnClick checkbox change class completed
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        todoEl.classList.add("completed");
      } else {
        todoEl.classList.remove("completed");
      }
      updateLS();
    });

    // OnClick Close delete todo
    btnClose.addEventListener("click", () => {
      todoEl.remove();
      updateLS();
    });

    // OnClick Update show modal 
    btnUpdate.addEventListener("click", () => {
      const modal = new Modal({
        title: "Update todo",
        content: `<input type="text" class="input-modal" id="input-modal" value="${todoText}">`,
        onSubmit: (newTodo) => {
          todoEl.innerText = newTodo && newTodo.trim() ? newTodo : todoText;
          todoEl.append(checkbox, btnUpdate, btnClose);
          updateLS();
        }
      });
      modal.show();
    });
    
    // append all btn to todo
    todoEl.append(checkbox, btnUpdate, btnClose);
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
      checked: todoEl.querySelector(".checkbox").checked
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}