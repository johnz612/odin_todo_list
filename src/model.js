"use strict";
import { format, add } from "date-fns";

const dateNow = new Date(Date.now());
const daysToAddTillNextWeek = 7 - dateNow.getDay();
const dateTomorrow = add(dateNow, { hours: 24 });
const dateNextWeek = add(dateNow, { days: daysToAddTillNextWeek });
const pickedDate = function (date) {
  return new Date(date);
};

export const myDayTaskContainer = [];
export const importantTaskContainer = [];
export const completedTaskContainer = [];
export let currentTaskIdSidebar = "";
export let currentPage = "myDay";

export function setCurrentTaskIdSidebar(id) {
  currentTaskIdSidebar = id;
}

export function getCurrentTaskIdSidebar() {
  return currentTaskIdSidebar;
}

export function setCurrentPage(page) {
  currentPage = page;
}

export function getCurrentPage() {
  return currentPage;
}
export const getTaskClicked = function (item, array) {
  const taskItem = array.find((object) => object.id === item);
  return taskItem;
};

export const removeItem = function (item, array) {
  const index = array.indexOf(item);
  array.splice(index, 1);
};

export const datesFormatted = function () {
  const dates = {
    todayComplete: format(dateNow, "EEEE, d LLLL"),
    today: format(dateNow, "EEE"),
    tomorrow: format(dateTomorrow, "EEE"),
    nextWeek: format(dateNextWeek, "EEE"),
  };
  return dates;
};

export const getPickedDate = function (day) {
  if (day === "Today") return dateNow;
  if (day === "Tomorrow") return dateTomorrow;
  if (day === "Next Week") return dateNextWeek;
  return pickedDate(day);
};
