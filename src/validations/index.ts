import zod from "zod";

export const signupSchema = zod.object({
  email: zod.string().trim().email(),
  password: zod.string().trim().min(6),
  firstName: zod.string().trim().min(2),
  lastName: zod.string().trim().min(2),
});
