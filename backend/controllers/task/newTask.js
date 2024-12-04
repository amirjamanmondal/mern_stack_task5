import TaskModel from "../../models/TaskModel";
import taskValidator from "../../schemaValidator/task.schemaValidator";

async function NewTask(req, res) {
  try {
    const { task } = taskValidator.parse(req.body);
    if (!task) return res.status(404).json({ message: "Input field is empty" });

    const user = req.user;

    const newTask = new TaskModel({
      task: task,
      author: user._id,
    });

    await newTask.save();

    res.status(201).json({ message: "Task Created!", newTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default NewTask;
