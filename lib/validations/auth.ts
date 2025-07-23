import { z } from "zod";

export const loginSchema = z.object({
	email: z.email({ error: "Invalid Email" }),
	password: z.string(),
});
export const signupSchema = z
	.object({
		email: z.email({ error: "Invalid Email" }),
		password: z
			.string()
			.min(8, { error: "Password should have minimum length of 8 characters" })
			.regex(/^(?=.*[A-Z]).{8,}$/, {
				error:
					"Should Contain at least one uppercase letter and have a minimum length of 8 characters.",
			}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		error: "Your passwords do not match",
	});
