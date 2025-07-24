"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "../validations/auth";
import {
	LoginActionResponse,
	LoginFormData,
	SignUpActionResponse,
	SignUpFormData,
} from "@/types/auth";

export async function handleLogin(
	prevState: LoginActionResponse | null,
	formData: FormData
) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Get the form data
	const loginData: LoginFormData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const validation = loginSchema.safeParse(loginData);

	if (!validation.success) {
		return {
			success: false,
			message: "Please fix the errors in the form",
			errors: validation.error.flatten().fieldErrors,
			inputs: loginData,
		};
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword(
		validation.data
	);

	if (error) {
		console.log("Login error:", error.message);
		return { error: error.message, inputs: loginData };
	}

	console.log("Login success:", data.user?.email);
	return { success: true };
}

export async function handleSignup(
	prevState: SignUpActionResponse | null,
	formData: FormData
) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
	// Get the form data
	const SignUpFormData: SignUpFormData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		confirmPassword: formData.get("confirmPassword") as string,
	};
	const validation = signupSchema.safeParse(SignUpFormData);

	if (!validation.success) {
		return {
			success: false,
			message: "Please fix the errors in the form",
			errors: validation.error.flatten().fieldErrors,
			inputs: SignUpFormData,
		};
	}

	const supabase = await createClient();
	const { email, password } = validation.data;
	const { data, error } = await supabase.auth.signUp({ email, password });

	if (error) {
		console.log("Signup Error", error.message);
		return { error: error.message };
	}

	console.log("signup success:", data.user?.email);
	return { success: true };
}
