"use strict";
import "./style.css";
import toDoView from "./view/todoView.js";
import rightSideBar from "./view/rightSideBar.js";
import task from "./task.js";
import taskItemTemplate from "./templates/todoListTemplate.js";
import * as model from "./model.js";
import view from "./view/View.js";
import completedItemTemplate from "./templates/completedListTemplate.js";
import completed from "./view/completed.js";
import leftSideBar from "./view/leftSideBar.js";
import todoView from "./view/todoView.js";
import importantView from "./view/importantView.js";

const updateDate = function () {
  view.updateDate(model.datesFormatted());
};

const updateToDoList = function (
  isWithImportant = false,
  index = "",
  item = ""
) {
  let myDayLength = model.myDayTaskContainer.length;
  if (isWithImportant === false) {
    model.myDayTaskContainer
      .toReversed()
      .forEach((item) => toDoView.renderNewTask(taskItemTemplate(item)));
  } else {
    model.myDayTaskContainer.splice(index, 1);
    model.myDayTaskContainer.push(item);
    model.myDayTaskContainer
      .toReversed()
      .forEach((item) => toDoView.renderNewTask(taskItemTemplate(item)));
  }

  // Update Left Side Bar's number of Tasks in a list
  leftSideBar.renderMyDayTaskLength(model.myDayTaskContainer.length);
  leftSideBar.renderImportantTaskLength(model.importantTaskContainer.length);
};

const updateImportantViewList = function () {
  model.importantTaskContainer
    .toReversed()
    .forEach((item) => importantView.renderNewTask(taskItemTemplate(item)));
};

const updateCompletedList = function () {
  const numberCompleted = model.completedTaskContainer.length;

  model.completedTaskContainer.forEach((task) => {
    completed.renderCompleteList(completedItemTemplate(task), numberCompleted);
  });

  // Update Left Side Bar nuber of Tasks in a list
  leftSideBar.renderMyDayTaskLength(model.myDayTaskContainer.length);
};

////////////////////////////////// To Do List Screen Control
const controlAddTaskToList = function () {
  // 1. Get New Task
  const newTask = new task(toDoView.getNewTasks());

  //   2. Push task to List Container Array
  model.myDayTaskContainer.push(newTask);

  //   3. Clear previous List
  toDoView.clear();

  // 4. Render new Task List
  updateToDoList();
};

const controlEditTaskName = function (item) {
  //1, Identify the object
  const taskClicked = model.getTaskClicked(item, model.myDayTaskContainer);
  // 2. Edit the object
  const newTaskName = rightSideBar.getEditedTaskName();
  taskClicked.name = newTaskName;

  //   3. Clear previous List
  toDoView.clear();

  // 4. Render and update the list
  updateToDoList();
};

const controlImportant = function (item) {
  // 1, Determine the object and update the imporant property of that object
  const taskClicked = model.getTaskClicked(item, model.myDayTaskContainer);
  taskClicked.isImportant = taskClicked.isImportant === true ? false : true;
  const index = model.myDayTaskContainer.indexOf(taskClicked);

  // 2. Add to important container
  if (taskClicked.isImportant === true) {
    model.importantTaskContainer.push(taskClicked);
  } else {
    const importantIndex = model.importantTaskContainer.indexOf(taskClicked);
    model.importantTaskContainer.splice(importantIndex, 1);
  }

  // 3. Clear previous List
  toDoView.clear();

  // 4. Update new Task List
  updateToDoList(taskClicked.isImportant, index, taskClicked);

  // 5. If taskClicekd  important property is false, then remove it in the important container
  // if (taskClicked.isImportant === false) {
  // }
};

const controlCompletedTask = function (item) {
  // 1. Determine the object and update the completed property of that object
  const taskCompleted = model.getTaskClicked(item, model.myDayTaskContainer);

  // 2. Add the object to Completed array container
  model.completedTaskContainer.push(taskCompleted);

  // 3. Remove the task in the my Day object
  const index = model.myDayTaskContainer.indexOf(taskCompleted);
  model.myDayTaskContainer.splice(index, 1);

  // 4. Remove the item in the important container if it's important.
  if (taskCompleted.isImportant) {
    let index = model.importantTaskContainer.indexOf(taskCompleted);
    model.importantTaskContainer.splice(index, 1);
  }

  // 4. Clear out previous list
  toDoView.clear();
  completed.clear();

  // 5. Render and update new Todo List
  updateToDoList();

  // 6. Close Side bar if open
  rightSideBar.closeSideBar();

  // 7. Render Completed List
  updateCompletedList();
};

const controlHideCompletedTask = function () {
  completed.hideShowCompleteList();
};

const controlRevertCompletedTask = function (item) {
  // 1. Get the object picked
  const taskToRevert = model.getTaskClicked(item, model.completedTaskContainer);

  // 2. Remove Item
  model.removeItem(taskToRevert, model.completedTaskContainer);

  // 3, Add the Remove Item back to Todo List
  model.myDayTaskContainer.unshift(taskToRevert);

  // 4, Add in the important container if property contains important
  if (taskToRevert.isImportant) {
    model.importantTaskContainer.push(taskToRevert);
  }

  // 5. Clear previous list
  toDoView.clear();
  completed.clear();

  // 6. Update todo list and completed List
  updateToDoList();
  updateCompletedList();

  // 7. Hide Complete List container if completed task is empty
  if (model.completedTaskContainer.length === 0) {
    completed.hideCompleteListContainer();
  }
};

const controlDeleteCompTask = function (item) {
  // 1. Get the object picked
  const taskToDelete = model.getTaskClicked(item, model.completedTaskContainer);

  // 2. Remove Item
  model.removeItem(taskToDelete, model.completedTaskContainer);

  // 3. Clear previous list
  completed.clear();

  // 4. Update todo list and completed List
  updateCompletedList();

  // 5. Hide Complete List container if completed task is empty
  if (model.completedTaskContainer.length === 0) {
    completed.hideCompleteListContainer();
  }
  // 6. Render if both list are empty
  if (
    model.myDayTaskContainer.length === 0 &&
    model.completedTaskContainer.length === 0
  ) {
    todoView.showListEmptyMessage();
  }
};

///////////////////////////////Right Side Bar Control
const controlRightSideBarOpen = function (item) {
  // 1. Open SideBar whn Item Clicked
  rightSideBar.openSideBar();

  //   2. Identfiy the Object clicked
  const taskClicked = model.getTaskClicked(item, model.myDayTaskContainer);

  // 3. Render the rightsidebar based on the Object clicked
  rightSideBar.renderSideBarDetails(taskClicked);
};

const controlRightSideBarClose = function () {
  // 1. Close sidebar when close button clicked
  rightSideBar.closeSideBar();
};

const controlDropDown = function (item, element) {
  rightSideBar.updateDatesRightSB(model.datesFormatted());
  // I. Identify the object and add a due date property
  const taskClicked = model.getTaskClicked(item, model.myDayTaskContainer);
  taskClicked.dueDate = model.getPickedDate(element);

  //   2. Clear previous List
  toDoView.clear();

  // 3. Render new Task List
  updateToDoList();
};

const controlDeleteTask = function (item) {
  // 1. Get the object picked
  const taskToDelete = model.getTaskClicked(item, model.myDayTaskContainer);

  // 2. Remove Item
  model.removeItem(taskToDelete, model.myDayTaskContainer);

  // 3. IF item isImportant is True delete it in container.
  if (taskToDelete.isImportant) {
    let index = model.importantTaskContainer.indexOf(taskToDelete);
    model.importantTaskContainer.splice(index, 1);
  }

  // 4. Clear previous list
  toDoView.clear();

  // 4. Update todo list and completed List
  updateToDoList();

  // 5. Close Right Side Bar
  rightSideBar.closeSideBar();

  // 6. Render if both list are empty
  if (
    model.myDayTaskContainer.length === 0 &&
    model.completedTaskContainer.length === 0
  ) {
    todoView.showListEmptyMessage();
  }
};

const controlLeftSideBar = function () {
  // 1. Clear List

  importantView.clear();

  // 2. Show BoilerPlate
  importantView.updateImportantScreen();

  // 1. Show importat List
  updateImportantViewList();
};

const init = function () {
  updateDate();

  toDoView.addHandlerGetTaskInput(controlAddTaskToList);
  rightSideBar.addListClickOpenHandler(controlRightSideBarOpen);
  rightSideBar.addListClickCLoseHandler(controlRightSideBarClose);
  rightSideBar.addTaskEditNameHandler(controlEditTaskName);
  rightSideBar.addDropDownDatesHandler(controlDropDown);
  rightSideBar.addDeleteClickHandler(controlDeleteTask);
  toDoView.addHandlerClickedImportant(controlImportant);
  toDoView.addHandlerCompletedTask(controlCompletedTask);
  completed.addHandlerHideCompleted(controlHideCompletedTask);
  completed.addHandlerRevertCompletedTask(controlRevertCompletedTask);
  completed.addHandlerDeleteCompletedTask(controlDeleteCompTask);

  leftSideBar.addHandlerClickedImportant(controlLeftSideBar);
};

init();
