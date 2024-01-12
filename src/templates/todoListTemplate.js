import { format, add } from "date-fns";

const dueDatesFormat = function (dueDate) {
  if (!dueDate) return "";
  const dateNow = new Date(Date.now());
  const dateTomorrow = add(dateNow, { hours: 24 });
  const dueDateFormated = format(dueDate, "EEEE, d LLLL");
  const dateNowFormatted = format(dateNow, "EEEE, d LLLL");
  const dateTomorrowFormatted = format(dateTomorrow, "EEEE, d LLLL");

  // If due date is today
  if (dueDateFormated === dateNowFormatted) return " - Today";

  // If due date is tomorrow
  if (dueDateFormated === dateTomorrowFormatted) return " - Tomorrow";

  return ` - ${format(dueDate, "EEEE, d LLLL")}`;
};

const TasksItemTemplate = function (task) {
  ////// Template
  // <li class="item-container">
  //             <span
  //               class="material-symbols-outlined check-icon"
  //               data-target="icon"
  //             >
  //               circle
  //             </span>
  //             <p class="item">
  //               <span class="">Pay BIlls</span>
  //               <span class="task-location">Habits</span>
  //             </p>
  //             <span
  //               class="material-symbols-outlined important"
  //               data-target="icon"
  //             >
  //               star
  //             </span>
  //  </li>

  const itemContainer = document.createElement("li");
  itemContainer.classList.add("item-container");
  itemContainer.setAttribute("data-id", task.id);

  const checkIcon = document.createElement("span");
  checkIcon.classList.add("material-symbols-outlined", "check-icon");
  checkIcon.setAttribute("data-icontype", "check"); // This is to pick the checkmark in the DOM
  checkIcon.textContent = "circle";

  const itemFieldText = document.createElement("p");
  itemFieldText.classList.add("item");
  const taskName = document.createElement("span");
  taskName.classList.add("task-name");
  taskName.textContent = task.name;
  const dueDate = document.createElement("span");
  dueDate.classList.add("due-date");
  dueDate.textContent = dueDatesFormat(task.dueDate); //task.dueDate ? ` - ${format(task.dueDate, "EEE")}` : "";
  const taskLocation = document.createElement("span");
  taskLocation.classList.add("task-location");
  taskLocation.textContent = task.group;
  taskLocation.appendChild(dueDate);
  itemFieldText.appendChild(taskName);
  itemFieldText.appendChild(taskLocation);

  const importantIcon = document.createElement("span");
  importantIcon.classList.add("material-symbols-outlined", "important");
  importantIcon.setAttribute("data-target", "icon");
  importantIcon.textContent = "star";
  task.isImportant === true
    ? importantIcon.classList.add("important-true")
    : importantIcon.classList.remove("important-true");

  itemContainer.appendChild(checkIcon);
  itemContainer.appendChild(itemFieldText);
  itemContainer.appendChild(importantIcon);

  // Attach Event Listeners
  checkIcon.addEventListener("mouseenter", function () {
    checkIcon.textContent = "task_alt";
  });

  checkIcon.addEventListener("mouseleave", function () {
    checkIcon.textContent = "circle";
  });

  return itemContainer;
};

export default TasksItemTemplate;
