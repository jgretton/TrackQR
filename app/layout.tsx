import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { AuthButton } from "@/components/auth/AuthButton";

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
				<nav className="flex gap-4">
					<Link href={"/"}>Home</Link>
					<Link href={"/dashboard"}>Dash</Link>
					<AuthButton />
				</nav>
				{children}
			</body>
		</html>
	);
}
