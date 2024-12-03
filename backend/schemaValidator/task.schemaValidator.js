import { z } from "zod";

const taskValidator = z.object({
  isDone: z.boolean().default(false),
  author: z.string().uuid().trim(),
  task: z.string().min(2, { message: "atleast 2 character required" }).trim(),
});

export default taskValidator;
