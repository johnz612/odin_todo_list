const TodoScreen = function () {
  const todoElement = document.createElement("div");

  const updateScreen = () => {
    const form = document.querySelector(".form");
    const icons = document.querySelectorAll(".check-icon");

    icons.forEach((icon) => {
      icon.addEventListener("mouseenter", function () {
        icon.textContent = "task_alt";
      });
    });

    icons.forEach((icon) => {
      icon.addEventListener("mouseleave", function () {
        icon.textContent = "circle";
      });
    });

    form.addEventListener("click", function (e) {
      let parentElement = e.target.parentElement;
    });
  };

  return { todoElement, updateScreen };
};

export default TodoScreen();
