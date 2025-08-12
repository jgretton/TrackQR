"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationLinks() {
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	return (
		<nav className="flex gap-6">
			<Link
				href="/dashboard"
				className={`font-medium ${
					isActive("/dashboard")
						? "text-blue-600"
						: "text-gray-600 hover:text-blue-800"
				}`}
			>
				Dashboard
			</Link>
			<Link
				href="/dashboard/qrcodes"
				className={`${
					isActive("/dashboard/qrcodes")
						? "text-blue-600"
						: "text-gray-600 hover:text-blue-800"
				}`}
			>
				QrCodes
			</Link>
		</nav>
	);
}
