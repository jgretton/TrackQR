"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "../validations/auth";

export async function handleLogin(prevState: any, formData: FormData) {
	// Get the form data
	const loginData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const validation = loginSchema.safeParse(loginData);

	console.log(validation);
	if (!validation.success) {
		// Validation failed
		console.log(validation.error);
		return { error: "Validation failed" };
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword(
		validation.data
	);

	if (error) {
		console.log("Login error:", error.message);
		return { error: error.message };
	}

	console.log("Login success:", data.user?.email);
	return { success: true };
}

export async function handleSignup(prevState: any, formData: FormData) {
	// Get the form data
	const signUpData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		confirmPassword: formData.get("confirmPassword") as string,
	};
	const validation = signupSchema.safeParse(signUpData);

	if (!validation.success) {
		console.log(validation.error);
		return { error: validation.error };
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
