import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
					<Link href={"/login"}>Login</Link>
					<Link href={"/signup"}>sign up</Link>
				</nav>
				{children}
			</body>
		</html>
	);
}
