import TaskModel from "../../models/TaskModel.js";

async function getAllTask(req, res) {
  try {
    const user = req.user;
    const tasks = await TaskModel.find({ author: user._id });
    if (tasks.length===0) return res.status(404).json({ message: "Task List is empty" });

    res.status(200).json({ tasks });
  } catch (error) {
    console.log("Error in get all task ", error);
    res.status(500).json({ message: "Error occured during fetch all task" });
  }
}

export default getAllTask;