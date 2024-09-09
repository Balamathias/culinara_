import { z } from "zod";

export const InsertPostSchema = z.object({
  title: z.string().max(140, { message: "Title is too long!"}),
  short_description: z.string().min(10, { message: 'Short description is too short!' }),
  content: z.string(),
  tags: z.string().optional(),
})