"use strict";

class RightSideBar {
  rightSideBarContainer = document.querySelector(".sidebar-right");
  close = document.querySelector(".close");
  listContainer = document.querySelector(".list");
  taskNameContainer = document.querySelector(".task-name-sidebar");
  dueDateElement = document.querySelector(".due-date-container");
  deleteButton = document.querySelector(".delete-container");
  datePicker = document.querySelector(".date-picker");
  checkIcon = document.querySelector(".check-icon");
  importantIcon = document.querySelector(".important");
  addNotesContainer = document.querySelector(".add-note");

  // Event Listener For when the sidebar should be open
  addListClickOpenHandler = function (handler) {
    this.listContainer.addEventListener("click", function (e) {
      if (
        e.target.dataset.target === "star" ||
        e.target.parentElement.classList.contains("complete") ||
        e.target.dataset.icontype === "check"
      )
        return;

      let taskItemClicked = e.target.closest("[data-id").dataset.id;

      handler(taskItemClicked);
    });
  };

  // Event Listener For when the sidebar should be close
  addListClickCLoseHandler = function (handler) {
    this.close.addEventListener("click", function (e) {
      handler();
    });
  };

  // Event Listener for editing the task details using the sidebar
  addTaskEditNameHandler = function (handler) {
    // Submit evenl listener
    this.taskNameContainer.parentElement.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        const inputElement = document.querySelector("input[data-id");
        let taskItemClicked = inputElement.dataset.id;
        handler(taskItemClicked);
      }
    );

    // Focusout event listener for the sidebar input filed
    this.taskNameContainer.addEventListener("focusout", function (e) {
      e.preventDefault();
      let taskItemClicked = e.target.closest("[data-id]").dataset.id;
      handler(taskItemClicked);
    });
  };

  addCheckClickHandler = function (handler) {
    this.checkIcon.addEventListener("click", function (e) {
      e.preventDefault();

      let taskItemClicked = e.target.closest("[data-id]").dataset.id;
      handler(taskItemClicked);
    });
  };

  addClickImportantHandler = function (handler) {
    this.importantIcon.addEventListener("click", function (e) {
      let taskItemClicked = e.target.closest("[data-id]").dataset.id;
      handler(taskItemClicked);
    });
  };

  getEditedTaskName = function () {
    let editedName = this.taskNameContainer.value;
    return editedName;
  };

  getDateValue = function () {
    return this.datePicker.value;
  };

  addDropDownDatesHandler = function (handler) {
    const dropDownElement = document.querySelector(".drop-down-date");
    const datePicker = document.querySelector(".date-picker");

    this.dueDateElement.addEventListener("click", function (e) {
      // Get the tasked ID to determine the object
      const pickedTasked = e.target.closest("[data-id]").dataset.id;
      // console.log(e.target);

      // Get the tasked date text, located at the 2nd child of its parent
      if (!e.target.closest(".picked-date")) {
        dropDownElement.classList.toggle("inactive");
        return;
      }

      let pickedDate = e.target.closest(".picked-date").children[1].textContent;

      if (pickedDate === "Pick a Date") {
        datePicker.showPicker();
        datePicker.addEventListener("change", function () {
          pickedDate = datePicker.value;
          // console.log(pickedDate);
          handler(pickedTasked, pickedDate);
        });
        return;
      } else {
        dropDownElement.classList.add("inactive");
      }

      handler(pickedTasked, pickedDate);
    });
  };

  addDeleteClickHandler = function (handler) {
    this.deleteButton.addEventListener("click", function (e) {
      const pickedTasked = e.target.closest("[data-id").dataset.id;
      handler(pickedTasked);
    });
  };

  updateDatesRightSB = function (date) {
    const today = document.querySelector(".today");
    const tomorrow = document.querySelector(".tomorrow");
    const nextWeek = document.querySelector(".next-week");

    today.textContent = date.today;
    tomorrow.textContent = date.tomorrow;
    nextWeek.textContent = date.nextWeek;
  };

  addNotesHandler = function (handler) {
    // Submit evenl listener
    // Parent element is a form so we listen for submit
    this.addNotesContainer.parentElement.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        const inputElement = document.querySelector("input[data-id]");
        let taskItemClicked = inputElement.dataset.id;
        handler(taskItemClicked);
      }
    );

    // Focusout event listener for the sidebar input filed
    this.addNotesContainer.addEventListener("focusout", function (e) {
      e.preventDefault();
      let taskItemClicked = e.target.closest("[data-id]").dataset.id;
      handler(taskItemClicked);
    });
  };

  getNotes = function () {
    let notes = this.addNotesContainer.value;
    console.log(notes);
    return notes;
  };

  closeOpenSidebar = function () {
    this.rightSideBarContainer.classList.toggle("inactive");
  };

  closeSideBar = function () {
    // Closing of the right sidebar
    this.closeOpenSidebar();
  };

  openSideBar = function () {
    // OPen of the right sidebar
    if (!this.rightSideBarContainer.classList.contains("inactive")) {
      return;
    }
    this.closeOpenSidebar();
  };

  renderSideBarDetails = function (task) {
    this.taskNameContainer.value = "";
    this.taskNameContainer.value = task.name;
    this.taskNameContainer.setAttribute("data-id", task.id);
    this.rightSideBarContainer.setAttribute("data-id", task.id);
    if (task.isImportant) {
      this.importantIcon.style.color = "rgb(138, 177, 164)";
    } else {
      this.importantIcon.style.color = "";
    }
    this.addNotesContainer.value = task.notes;
  };
}

export default new RightSideBar();
