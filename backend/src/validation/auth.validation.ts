import { email, z } from "zod";

const registerUser = {
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(25, "Name must be at most 25 characters"),

    email: z.email("Please enter a valid email"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(16, "Password must be at most 16 characters long"),

    role: z.enum(["Member", "Admin"]).optional().default("Member"),
  }),
};

const loginUser = {
  body: z.object({
    email: z.email("Please enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(16, "Password must be at most 16 characters long"),
  }),
};

export { registerUser, loginUser };
