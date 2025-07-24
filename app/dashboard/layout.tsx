import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";

export const metadata: Metadata = {
	title: "TrackQR Dashboard",
	description: "QR code management dashboard",
};

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="border-b bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center gap-8">
							<Link
								href="/dashboard"
								className="text-xl font-semibold text-gray-900"
							>
								TrackQR
							</Link>
							<nav className="flex gap-6">
								<Link
									href="/dashboard"
									className="text-blue-600 hover:text-blue-800 font-medium"
								>
									Dashboard
								</Link>
								<Link
									href="/dashboard/create"
									className="text-gray-600 hover:text-gray-800"
								>
									Create QR Code
								</Link>
								<Link
									href="/dashboard/analytics"
									className="text-gray-600 hover:text-gray-800"
								>
									Analytics
								</Link>
							</nav>
						</div>
						<AuthButton />
					</div>
				</div>
			</div>
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</>
	);
}
