import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/styles';
import useAuth from '../../hooks/useAuth';
import * as C from "./styles";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  // Seleção de elementos
  const todoForm = document.querySelector("#todo-form");
  const todoInput = document.querySelector("#todo-input");
  const todoList = document.querySelector("#todo-list");
  const editForm = document.querySelector("#edit-form");
  const editInput = document.querySelector("#edit-input");
  const cancelEditBtn = document.querySelector("#cancel-edit-btn");
  const searchInput = document.querySelector("#search-input");
  const eraseBtn = document.querySelector("#erase-button");
  const filterBtn = document.querySelector("#filter-select");

  let oldInputValue;

  // Funções
  const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    // Utilizando dados da localStorage
    if (done) {
      todo.classList.add("done");
    }

    if (save) {
      saveTodoLocalStorage({ text, done: 0 });
    }

    todoList.appendChild(todo);

    todoInput.value = "";
  };

  const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
  };

  const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
      let todoTitle = todo.querySelector("h3");

      if (todoTitle.innerText === oldInputValue) {
        todoTitle.innerText = text;

        // Utilizando dados da localStorage
        updateTodoLocalStorage(oldInputValue, text);
      }
    });
  };

  const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
      const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

      todo.style.display = "flex";

      console.log(todoTitle);

      if (!todoTitle.includes(search)) {
        todo.style.display = "none";
      }
    });
  };

  const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
      case "all":
        todos.forEach((todo) => (todo.style.display = "flex"));

        break;

      case "done":
        todos.forEach((todo) =>
          todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );

        break;

      case "todo":
        todos.forEach((todo) =>
          !todo.classList.contains("done")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
        );

        break;

      default:
        break;
    }
  };

  // Eventos
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue) {
      saveTodo(inputValue);
    }
  });

  document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;

    if (parentEl && parentEl.querySelector("h3")) {
      todoTitle = parentEl.querySelector("h3").innerText || "";
    }

    if (targetEl.classList.contains("finish-todo")) {
      parentEl.classList.toggle("done");

      updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("remove-todo")) {
      parentEl.remove();

      // Utilizando dados da localStorage
      removeTodoLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("edit-todo")) {
      toggleForms();

      editInput.value = todoTitle;
      oldInputValue = todoTitle;
    }
  });

  cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
  });

  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue) {
      updateTodo(editInputValue);
    }

    toggleForms();
  });

  searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    getSearchedTodos(search);
  });

  eraseBtn.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("keyup"));
  });

  filterBtn.addEventListener("change", (e) => {
    const filterValue = e.target.value;

    filterTodos(filterValue);
  });

  // Local Storage
  const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;
  };

  const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
      saveTodo(todo.text, todo.done, 0);
    });
  };

  const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text != todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
  };

  const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
      todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
      todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
  };

  loadTodos();


  return (
    <C.Container>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Todo Avançado</title>
        <link rel="stylesheet" href="css/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
          integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="js/scripts.js" defer></script>
      </head>



      <C.Title> Lista de Tarefas </C.Title>

      <div class="todo-container">

        <form id="todo-form">
          <p>Adicione sua tarefa</p>
          <div class="form-control">
            <input
              type="text"
              id="todo-input"
              placeholder="O que você vai fazer ?"
            />
            <button type="submit">
              <i class="fa-thin fa-plus"></i>
            </button>
          </div>
        </form>
        <form id="edit-form" class="hide">
          <p>Edite sua tarefa</p>
          <div class="form-control">
            <input type="text" id="edit-input" />
            <button type="submit">
              <i class="fa-solid fa-check-double"></i>
            </button>
          </div>
          <button id="cancel-edit-btn">Cancelar</button>
        </form>
        <div id="toolbar">
          <div id="search">
            <h4>Pesquisar:</h4>
            <form>
              <input type="text" id="search-input" placeholder="Buscar..." />
              <button id="erase-button">
                <i class="fa-solid fa-delete-left"></i>
              </button>
            </form>
          </div>
          <div id="filter">
            <h4>Filtrar:</h4>
            <select id="filter-select">
              <option value="all">Todos</option>
              <option value="done">Feitos</option>
              <option value="todo">A fazer</option>
            </select>
          </div>
        </div>
        <div id="todo-list">

        </div>

      </div>




      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  )
}

export default Home;