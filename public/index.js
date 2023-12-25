// import eruda from "../node_modules/eruda/eruda.js";
const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");


// // DevTools
// eruda.init()
//
async function fetchTodos() {
  const response = await fetch("/todos");
  const todos = await response.json();
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const article = document.createElement("article");
    article.classList.add('grid')
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todo.completed === 1; // Use 1 for true, 0 for false
    checkbox.addEventListener('change', () => {
      // Update the completed status when the checkbox state changes
      updateTodo(todo.id, todo.text, checkbox.checked ? 1 : 0);
    });
    const para = document.createElement("p");
    para.textContent = todo.text;
   
    // Strikethrough completed
    if(checkbox.checked){
      para.classList.add('done')
    }


    // Create update button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Edit';
    updateButton.addEventListener('click', () => {
      const updatedText = prompt('Edit todo:', todo.text);
      if (updatedText !== null) {
        updateTodo(todo.id, updatedText, todo.completed);
      }
    });
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('warning')
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTodo(todo.id);
    });
    
    article.append(checkbox, para, updateButton, deleteButton);
    todoList.appendChild(article);
  });
}

async function addTodo() {
  const text = todoInput.value;
  if (text.trim() === "") return;

  await fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  todoInput.value = "";
  fetchTodos();
}

async function updateTodo(id, text, completed) {
  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, completed }),
  });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/todos/${id}`, {
    method: "DELETE",
  });
  fetchTodos();
}

fetchTodos();

