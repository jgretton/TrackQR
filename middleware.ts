import { type NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: [
		// Only run middleware on protected routes and auth routes
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
		"/dashboard/:path*",
		"/auth/:path*",
		"/qrcodes/:path*",
		"/analytics/:path*",
		// Still catch root for redirect logic
		"/",
	],
};
