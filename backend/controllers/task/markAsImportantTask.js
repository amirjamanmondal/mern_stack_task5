import TaskModel from "../../models/TaskModel.js";
import taskValidator from "../../schemaValidator/task.schemaValidator.js";
import mongoose from "mongoose";

async function markAsImportantTask(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const isDonePayload = { isDone: req.body.isDone };
    const { isDone } = taskValidator.parse(isDonePayload);

    const mark = await TaskModel.findByIdAndUpdate(
      id,
      { isDone: isDone },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ mark });
  } catch (error) {
    console.log("Internal server error during mark the task", error);
    res
      .status(500)
      .json({ message: "Internal server error during mark the task" });
  }
}

export default markAsImportantTask;
