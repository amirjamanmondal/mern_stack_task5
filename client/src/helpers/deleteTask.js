import axios from "axios";

async function deleteTask(id, { setTaskList }) {
  try {
    await axios.delete(`http://localhost:8080/user/tasks/delete/${id}`, {
      withCredentials: true,
    });
    setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id)); // Remove deleted task locally
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

export default deleteTask;
