class TodoScreen {
  listContainer = document.querySelector(".list");
  form = document.querySelector(".form");
  addTask = document.querySelector(".add-task");
  listEmpty = document.querySelector(".list-empty");

  clear = function () {
    this.listContainer.innerHTML = "";
  };

  getNewTasks = function () {
    const userTask = this.addTask.value;
    this.addTask.value = "";
    return userTask;
  };

  addHandlerGetTaskInput = function (handler) {
    this.form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  };

  addHandlerClickedImportant = function (handler) {
    this.listContainer.addEventListener("click", function (e) {
      if (e.target.dataset.target !== "icon") return;
      const element = e.target;
      element.style.color = "rgb(138, 177, 164)";
      let pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };

  addHandlerCompletedTask = function (handler) {
    this.listContainer.addEventListener("click", function (e) {
      if (e.target.dataset.icontype !== "check") return;

      // e.target.classList.add("completed-icon");
      let pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };

  showListEmptyMessage = function () {
    this.listEmpty.classList.remove("inactive");
  };

  renderNewTask = function (element, length) {
    this.listEmpty.classList.add("inactive");
    this.listContainer.appendChild(element);
  };
}
export default new TodoScreen();
