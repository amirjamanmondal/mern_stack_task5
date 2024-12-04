import TaskModel from "../../models/TaskModel";
import taskValidator from "../../schemaValidator/task.schemaValidator";

async function markAsImportantTask(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const isDone = taskValidator.parse(req.body);

    const mark = await TaskModel.findByIdAndUpdate(
      id,
      { isDone: isDone },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(204).end();
  } catch (error) {
    console.log("Internal server error during mark the task", error);
    res
      .status(500)
      .json({ message: "Internal server error during mark the task" });
  }
}

export default markAsImportantTask;
