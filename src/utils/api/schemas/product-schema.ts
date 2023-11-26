import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp", "svg"];

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Please include product title"),
  price: z.number().min(1, "Please include item price"),
  description: z.string().min(1, "Please include item description"),
  category: z.string().min(1, "Please include item category"),
  image: z
    .any()
    .refine(
      (file) =>
        ACCEPTED_IMAGE_TYPES.includes(
          file.split(".")[file.split(".").length - 1],
        ),
      { message: "Only .jpg, .jpeg, .png and .webp formats are supported." },
    ),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  }),
});

export type Product = z.infer<typeof ProductSchema>;
