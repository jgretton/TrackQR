import type { Metadata } from "next";
import "../globals.css";

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
		<div className="size-full min-h-dvh min-w-dvw bg-gray-50 pt-20">
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{children}
			</main>
		</div>
	);
}
