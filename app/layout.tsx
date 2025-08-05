import type { Metadata } from "next";
import "./globals.css";
import { AuthButton } from "@/components/auth/AuthButton";
import { NavigationLinks } from "@/components/NavigationLinks";
import Link from "next/link";
import NavigationHeader from "@/components/NavigationHeader";

export const metadata: Metadata = {
	title: "TrackQR",
	description: "Qr code generator and analytics application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased`}>
				<NavigationHeader />
				{children}
			</body>
		</html>
	);
}
