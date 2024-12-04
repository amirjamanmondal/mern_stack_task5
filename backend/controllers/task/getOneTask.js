import TaskModel from "../../models/TaskModel.js";

async function GetOneTask(req, res) {
  try {
    const id = req.params.id;

    const task = await TaskModel.findById(id);

    if (!task) return res.status(404).json({ message: "Task  is not found!" });

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

export default GetOneTask;
