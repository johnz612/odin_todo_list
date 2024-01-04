class View {
  dateNow = document.querySelector(".date");

  updateDate = function (date) {
    this.dateNow.textContent = date.todayComplete;
  };
}

export default new View();
