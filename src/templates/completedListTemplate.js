import { format } from "date-fns";
const CompletedItemTemplate = function (task) {
  ////// Template
  {
    /* <li class="item-container complete">
                <span class="material-symbols-outlined completed-icon">
                  task_alt
                </span>

                <p class="item complete">
                  <span class="completed-text">Pay BIlls</span>
                  <span class="task-location">Habits</span>
                </p>
                <span class="material-symbols-outlined important"> star </span>
              </li> */
  }

  const itemContainer = document.createElement("li");
  itemContainer.classList.add("item-container", "complete");
  itemContainer.setAttribute("data-id", task.id);

  const checkIcon = document.createElement("span");
  checkIcon.classList.add("material-symbols-outlined", "completed-icon");
  checkIcon.setAttribute("data-icontype", "check"); // This is to pick the checkmark in the DOM
  checkIcon.textContent = "task_alt";

  const itemFieldText = document.createElement("p");
  itemFieldText.classList.add("item", "complete");
  const taskName = document.createElement("span");
  taskName.classList.add("completed-text");
  taskName.textContent = task.name;
  const dueDate = document.createElement("span");
  dueDate.classList.add("due-date");
  dueDate.textContent = task.dueDate ? ` - ${format(task.dueDate, "EEE")}` : "";
  const taskLocation = document.createElement("span");
  taskLocation.classList.add("task-location");
  taskLocation.textContent = task.group;
  taskLocation.appendChild(dueDate);
  itemFieldText.appendChild(taskName);
  itemFieldText.appendChild(taskLocation);

  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("material-symbols-outlined", "delete");
  deleteIcon.setAttribute("data-target", "delete");
  deleteIcon.textContent = "delete";
  task.isImportant === true
    ? deleteIcon.classList.add("important-true")
    : deleteIcon.classList.remove("important-true");

  itemContainer.appendChild(checkIcon);
  itemContainer.appendChild(itemFieldText);
  itemContainer.appendChild(deleteIcon);

  return itemContainer;
};

export default CompletedItemTemplate;
