import TaskModel from "../../models/TaskModel.js";

async function deleteSelectedTask(req, res) {
  try {
    const { selectedId } = req.body;

    if (!selectedId) {
      return res.status(404).json({message:"No body found for deleting "})
    }
    if (!Array.isArray(selectedId) || selectedId.length === 0) {
      return res
        .status(400)
        .json({ message: "No task IDs provided for deletion.", selectedId });
    }

    const selectionDeleted = await TaskModel.deleteMany({
      _id: { $in: selectedId },
    });

    if (selectionDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "No tasks found to delete." });
    }

    res.status(200).json({
      message: `${selectionDeleted.deletedCount} tasks deleted successfully.`,
      selectionDeleted,
      selectedId,
    });
  } catch (error) {
    console.log("Internal server Error during deleting tasks", error);
    res
      .status(500)
      .json({ message: "Internal server Error during deleting tasks" });
  }
}

export default deleteSelectedTask;
