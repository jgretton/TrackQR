"use server";

import { createClient } from "@/utils/supabase/server";

export async function handleLogin(prevState: any, formData: FormData) {
	// Get the form data
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const supabase = await createClient();
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.log("Login error:", error.message);
		return { error: error.message };
	}

	console.log("Login success:", data.user?.email);
	return { success: true };
}

export async function handleSignup(prevState: any, formData: FormData) {
	// Get the form data
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const confirmPassword = formData.get("confirmPassword") as string;

	if (password !== confirmPassword) {
		console.log("passwords dont match");
		return;
	}

	const supabase = await createClient();
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		console.log("Signup Error", error.message);
		return { error: error.message };
	}

	console.log("signup success:", data.user?.email);
	return { success: true };
}
