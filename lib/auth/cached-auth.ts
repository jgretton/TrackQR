"use server";

import { unstable_cache, revalidateTag } from "next/cache";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Internal cached function that takes cookies as parameter
 * This avoids the "cookies inside unstable_cache" error
 */
const getCachedUserInternal = unstable_cache(
	async (cookieString: string) => {
		console.log("🔥 Making Supabase auth request - this should be rare!");

		// Parse cookies from string back to key-value pairs
		const cookieMap = new Map();
		if (cookieString) {
			cookieString.split(";").forEach((cookie) => {
				const [key, value] = cookie.trim().split("=");
				if (key && value) {
					cookieMap.set(key, value);
				}
			});
		}

		const supabase = createServerClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			{
				cookies: {
					getAll() {
						return Array.from(cookieMap.entries()).map(([name, value]) => ({
							name,
							value: decodeURIComponent(value),
						}));
					},
					setAll() {
						// No-op for cached function
					},
				},
			}
		);

		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		if (error || !user) {
			return null;
		}

		// Only cache essential, non-sensitive user data
		return {
			id: user.id,
			email: user.email,
		};
	},
	["user-session"], // Cache key
	{
		tags: ["auth"], // For targeted cache invalidation
		revalidate: 60, // Cache for 60 seconds
	}
);

/**
 * Public function that handles cookies outside the cache
 */
export async function getCachedUser() {
	const cookieStore = await cookies();
	const cookieString = cookieStore.toString();
	return await getCachedUserInternal(cookieString);
}

/**
 * Helper function that throws if user is not authenticated
 * Use this in server actions that require authentication
 */
export async function requireAuth() {
	const user = await getCachedUser();

	if (!user) {
		redirect("/auth/login");
	}

	return user;
}

/**
 * Helper function that returns user or null without redirecting
 * Use this when you want to handle auth state manually
 */
export async function getOptionalUser() {
	return await getCachedUser();
}

/**
 * Invalidate the cached user session
 * Call this after login, logout, or user data changes
 */
export async function invalidateUserSession() {
	console.log("🔄 Invalidating user session cache");
	revalidateTag("auth");
}

/**
 * Check if user is authenticated (returns boolean)
 * Useful for conditional rendering in server components
 */
export async function isAuthenticated() {
	const user = await getCachedUser();
	return !!user;
}
