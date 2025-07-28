"use server";

import { createClient } from "@/utils/supabase/server";
import { loginSchema, signupSchema } from "../validations/auth";
import {
	LoginActionResponse,
	LoginFormData,
	SignUpActionResponse,
	SignUpFormData,
} from "@/types/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { invalidateUserSession } from "@/lib/auth/cached-auth";

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
	const { error } = await supabase.auth.signInWithPassword(validation.data);
	if (error) {
		return {
			success: false,
			message: error.message,
			errors: { message: error.message, code: error.code },
			inputs: loginData,
		};
	}
	
	// Invalidate cached auth state after successful login
	await invalidateUserSession();
	revalidatePath("/", "layout");
	redirect("/dashboard");
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
		return {
			success: false,
			message: error.message,
			error: error.message,
			inputs: SignUpFormData,
		};
	}

	console.log("signup success:", data.user?.email);
	
	// Invalidate cached auth state after successful signup
	await invalidateUserSession();
	
	return {
		success: true,
		message: "Account created successfully",
	};
}

/**
 * Handle user logout with proper cache invalidation
 */
export async function handleLogout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	
	if (error) {
		console.error("Logout error:", error);
		return;
	}
	
	// Invalidate cached auth state after logout
	await invalidateUserSession();
	revalidatePath("/", "layout");
	redirect("/auth/login");
}
