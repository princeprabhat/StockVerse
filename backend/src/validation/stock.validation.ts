import { z } from "zod";

const stockById = {
  params: z.object({
    stockId: z.uuid("Please enter a valid id"),
  }),
};

export { stockById };
