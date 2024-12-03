import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      min: 2,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    isDone: {
      type: Boolean,
      default: false,
      requried: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", taskSchema);

export default TaskModel;
