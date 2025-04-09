import dayBackground from "../images/background_day.jpg";
import nightBackground from "../images/background.jpeg";

class TodoScreen {
  listContainer = document.querySelector(".list");
  form = document.querySelector(".form");
  addTask = document.querySelector(".add-task");
  listEmpty = document.querySelector(".list-empty");
  mainScreenContainer = document.querySelector(".todo-container");

  // Background images using Webpack asset management
  dayBackground = `url(${dayBackground})`;
  nightBackground = `url(${nightBackground})`;

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
      e.preventDefault();
      // If clicked is not an icon return
      if (e.target.dataset.target !== "star") return;
      // If its an icon, then change color of the icon

      const element = e.target;
      element.style.color = "rgb(138, 177, 164)";
      let pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };

  addHandlerCompletedTask = function (handler) {
    this.listContainer.addEventListener("click", function (e) {
      if (e.target.dataset.icontype !== "check") return;

      console.log("in completed task");
      // e.target.classList.add("completed-icon");
      let pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };

  showListEmptyMessage = function () {
    this.listEmpty.classList.remove("inactive");
  };

  renderBackgroundBasedOnTime = function () {
    const now = new Date();
    const hour = now.getHours(); // Returns the hour (0-23)

    // Define day-time hours: for example, between 6:00 and 18:00
    const isDayTime = hour >= 6 && hour < 18;

    // Add the corresponding class to the body

    if (isDayTime) {
      this.mainScreenContainer.style.backgroundImage = this.dayBackground;
    } else {
      this.mainScreenContainer.style.backgroundImage = this.nightBackground;
    }
  };

  renderNewTask = function (element) {
    this.listEmpty.classList.add("inactive");
    this.listContainer.appendChild(element);
  };
}
export default new TodoScreen();
