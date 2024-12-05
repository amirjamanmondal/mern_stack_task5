import TaskModel from "../../models/TaskModel.js";
import mongoose from "mongoose";

async function deleteOneTask(req, res) {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await TaskModel.findByIdAndDelete(id);

    if (!task) return res.status(404).json({ message: "Task is not found!" });

    res.status(200).json({message:"Task Deleted"});
  } catch (error) {
    console.log("Error during Task Delete", error);
    res.status(500).json({
      message: "An internal server error occurred during delete task.",
    });
  }
}

export default deleteOneTask;
