import axios from "axios";

async function CompleTask(task, { mark, setTaskList }) {
  try {
    const updatedTask = { ...task, isDone: !task.isDone };
    if (mark === true) {
      const res = await axios.patch(
        `http://localhost:8080/user/tasks/mark/${task._id}`,
        {
          isDone: mark,
        },
        { withCredentials: true }
      );
      setTaskList((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      ); // Update local state
    }
  } catch (error) {
    console.error("Error toggling task mark:", error);
  }
}

export default CompleTask;
