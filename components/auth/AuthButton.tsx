import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./LogoutButton";
import type { User } from "@supabase/supabase-js";

export async function AuthButton({ user }: { user: User | null }) {
	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<LogoutButton />
		</div>
	) : (
		<div className="flex gap-2">
			<Button>
				<Link href="/auth/login">Sign in</Link>
			</Button>
			<Button>
				<Link href="/auth/sign-up">Sign up</Link>
			</Button>
		</div>
	);
}
