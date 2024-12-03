import { z } from "zod";

const userValidator = z.object({
  name: z
    .string()
    .min(5, { message: "atleast 5 character required" })
    .optional()
    .trim(),
  username: z
    .string()
    .min(5, { message: "atleast 5 character required" })
    .trim(),
  password: z
    .string()
    .min(5, { message: "atleast 5 character required" })
    .trim(),
});

export default userValidator;