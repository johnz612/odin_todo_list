class LeftSideBar {
  numberMyday = document.querySelector(".number-myDay");
  renderMyDayTaskLength = function (length) {
    length === 0
      ? (this.numberMyday.textContent = "")
      : (this.numberMyday.textContent = length);
  };
}

export default new LeftSideBar();
