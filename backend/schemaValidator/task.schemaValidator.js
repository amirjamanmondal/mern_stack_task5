import { z } from "zod";

const taskValidator = z.object({
  task: z.string().min(2, { message: "atleast 2 character required" }).trim(),
  author: z.string().uuid().trim().optional(),
  isDone: z
    .boolean({ message: "This value expected to be boolean" })
    .default(false)
    .optional(),
});

export default taskValidator;
