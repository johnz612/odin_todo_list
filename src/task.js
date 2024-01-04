import { v4 as uuidv4 } from "uuid";

class Tasks {
  constructor(
    name,
    group = "Tasks",
    steps = [],
    dueDate = "",
    isImportant = false
  ) {
    this.name = name;
    this.group = group;
    this.steps = steps;
    this.dueDate = dueDate;
    this.id = uuidv4();
    this.isImportant = isImportant;
  }
}

export default Tasks;
