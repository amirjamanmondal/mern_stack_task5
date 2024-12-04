import TaskModel from "../../models/TaskModel.js";
import taskValidator from "../../schemaValidator/task.schemaValidator.js";
import mongoose from "mongoose";

async function updateOneTask(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const { task } = taskValidator.parse(req.body);

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { task: task },
      { new: true, runValidators: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Update task failed!" });

    res.status(200).json({ message: "Task Updated Successfully", updatedTask });
  } catch (error) {
    console.log("Internal Error during update task", error);
    res.status(500).json({ message: "Internal Error during update task!" });
  }
}

export default updateOneTask;
