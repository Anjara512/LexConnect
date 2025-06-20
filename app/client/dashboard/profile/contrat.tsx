
import { z } from "zod";

export const contartSchema = z.object({
 motif: z.string(),
 budget: z.number()
});

export type ctrScheme = z.infer<typeof contartSchema>

