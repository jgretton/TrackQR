import { NextRequest, NextResponse } from "next/server";
import { ipAddress, geolocation } from "@vercel/functions";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
	req: NextRequest,
	{ params }: { params: { code: string } }
) {
	// get code from params
	const { code } = await params;
	if (!code) {
		console.log("No code found in params");
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
	// check code exists
	const QrData = await prisma.qrCode.findUnique({
		where: {
			redirect_code: code,
		},
	});

	// if no - redirect them somewhere (lets discuss where or 404)
	if (!QrData) {
		console.log("no code exists");
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	//check if inactive or expired
	if (
		!QrData.is_active ||
		(QrData.expires_at && QrData.expires_at < new Date())
	) {
		console.log("expired or inactive");
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	// if. yes - get redicrect and id
	const ip = ipAddress(req);

	console.log(ip);
	// get ip address.
	// use ip address in package to get full analytic data
	// compile into object to save to scan.
	// Save to scan
	// redirect user to redirect url

	// // Optionally get additional location data
	// const location = geolocation(req);

	// console.log("Detected IP:", ip);
	// console.log("Location data:", location);

	// return NextResponse.json({
	// 	ip,
	// 	location, // Includes city, country, region, etc.
	// });
	return NextResponse.json({ success: true, QrData });
}
