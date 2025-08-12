import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";
import { NavigationLinks } from "./NavigationLinks";
import { createClient } from "@/utils/supabase/server";

export default async function NavigationHeader() {
	const supabase = await createClient();

	// You can also use getUser() which will be slower.
	const { data } = await supabase.auth.getUser();

	const user = data?.user;

	return (
		<div className="border-b bg-white shadow-sm fixed w-full z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center w-full justify-between gap-8">
						<Link
							href="/dashboard"
							className="text-xl font-semibold text-gray-900"
						>
							TrackQR
						</Link>
						{user ? (
							<div className="flex w-full justify-between items-center">
								<NavigationLinks />
								<AuthButton user={user} />
							</div>
						) : (
							<AuthButton user={user} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
