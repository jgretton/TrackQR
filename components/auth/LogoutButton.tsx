"use client";

import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth";

export function LogoutButton() {
	return (
		<form action={handleLogout}>
			<Button type="submit" variant="outline">
				Logout
			</Button>
		</form>
	);
}
