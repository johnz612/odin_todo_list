"use strict";

class ImportantView {
  container = document.querySelector(".todo-container");

  clear = function () {
    this.container.innerHTML = "";
  };

  generateMarkUp = function () {
    return `<div class="todo">
    <h1><span class="material-symbols-outlined important"> star </span> <span>Important</span></h1>
    <div class="list-empty">
      <p>List is Empty!</p>
      <p>Be Productive, add tasks and just do it!</p>
    </div>
    <div class="list-container">
      <ul class="list"></ul>

      <div class="complete-text inactive">
        <span class="arrow">▼</span>Completed<span
          class="number-completed"
          >0</span
        >
      </div>
      <ul class="completed-list list complete inactive">
        <li class="item-container complete">
          <span class="material-symbols-outlined completed-icon">
            task_alt
          </span>

          <p class="item complete">
            <span class="completed-text">Pay BIlls</span>
            <span class="task-location">Habits</span>
          </p>
          <span class="material-symbols-outlined important"> star </span>
        </li>
      </ul>
    </div>

    <form action="" class="form">
      <span class="material-symbols-outlined add-icon"> add </span>
      <input
        type="text"
        class="add-task"
        placeholder="Add a Task"
        onfocus="this.placeholder=''"
        onblur="this.placeholder='Add a Task'"
        min="1"
        required
      />
    </form>
  </div>`;
  };

  updateImportantScreen = function () {
    this.container.insertAdjacentHTML("afterbegin", this.generateMarkUp());
  };

  renderNewTask = function (element) {
    let listContainer = document.querySelector(".list");
    let listEmpty = document.querySelector(".list-empty");
    listEmpty.classList.add("inactive");
    listContainer.appendChild(element);
  };
}

export default new ImportantView();
