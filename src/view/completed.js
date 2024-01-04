class CompletedList {
  complete = document.querySelector(".complete");
  completeText = document.querySelector(".complete-text");
  numberCompleted = document.querySelector(".number-completed");
  arrowElement = document.querySelector(".arrow");

  clear = function () {
    this.complete.innerHTML = "";
  };

  renderCompleteList = function (element, number) {
    this.completeText.classList.remove("inactive");
    this.complete.appendChild(element);
    this.numberCompleted.textContent = number;
    this.complete.classList.remove("inactive");
    if (this.arrowElement.textContent === "►") {
      this.complete.classList.add("inactive");
    }
  };

  hideCompleteListContainer = function () {
    this.complete.classList.add("inactive");
    this.completeText.classList.add("inactive");
  };

  hideShowCompleteList = function () {
    this.complete.classList.toggle("inactive");
    this.arrowElement.textContent =
      this.arrowElement.textContent === "▼" ? "►" : "▼";
  };

  addHandlerHideCompleted = function (handler) {
    this.completeText.addEventListener("click", function (e) {
      handler();
    });
  };

  addHandlerRevertCompletedTask = function (handler) {
    this.complete.addEventListener("click", function (e) {
      if (e.target.dataset.icontype !== "check") return;
      const pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };

  addHandlerDeleteCompletedTask = function (handler) {
    this.complete.addEventListener("click", function (e) {
      if (e.target.dataset.target !== "delete") return;
      const pickedTasked = e.target.closest("[data-id]").dataset.id;
      handler(pickedTasked);
    });
  };
}

export default new CompletedList();
