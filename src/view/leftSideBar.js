class LeftSideBar {
  container = document.querySelector(".todo-container");
  myDay = document.querySelector(".my-day");
  important = document.querySelector(".important-list");
  numberMyday = document.querySelector(".number-myDay");
  numberImportant = document.querySelector(".number-important");

  renderMyDayTaskLength = function (length) {
    length === 0
      ? (this.numberMyday.textContent = "")
      : (this.numberMyday.textContent = length);
  };

  renderImportantTaskLength = function (length) {
    length === 0
      ? (this.numberImportant.textContent = "")
      : (this.numberImportant.textContent = length);
  };

  addHandlerClickedMyDay = function (handler) {
    this.myDay.addEventListener("click", function (e) {
      console.log(e.target.closest(".my-day"));
    });
  };

  clearScreen = function (handler) {
    this.container.innerHTML = "";
  };

  addHandlerClickedImportant = function (handler) {
    this.important.addEventListener("click", function (e) {
      handler();
    });
  };
}

export default new LeftSideBar();
