import { z } from "zod";

export const createQRSchema = z.object({
	name: z.string().min(1, "This field is required"),
	destination: z.url({ protocol: /^https$/ }),
	expires_at: z.preprocess(
		(val) =>
			val === ""
				? undefined
				: val === undefined
				? undefined
				: new Date(val as string),
		z.date().optional()
	),
});

export const updateQRSchema = z.object({
	name: z.string().min(1, "This field is required"),
	destination: z.url({ protocol: /^https$/ }),
	expires_at: z.preprocess(
		(val) =>
			val === ""
				? undefined
				: val === undefined
				? undefined
				: new Date(val as string),
		z.date().optional()
	),
	is_active: z.boolean(),
});
