import { NextRequest, NextResponse, userAgent } from "next/server";
import { ipAddress, geolocation } from "@vercel/functions";
import { PrismaClient, Scan } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ code: string }> }
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
	// const ip =
	// 	process.env.NODE_ENV === "development" ? "8.8.8.8" : ipAddress(req);
	// const location = geolocation(req);
	const ip = ipAddress(req);
	console.log(ip);
	const locationData = geolocation(req);
	console.log(locationData);
	const user_agent = userAgent(req);
	console.log(user_agent);

	// const scan: Scan = await prisma.scan.create({
	// 	data: {
	// 		qr_code_id: QrData.id,
	// 		scanned_at: new Date(),

	// 	},
	// });

	// get ip address.
	// use ip address in package to get full analytic data
	// compile into object to save to scan.
	// Save to scan
	// redirect user to redirect url

	// // Optionally get additional location data

	// console.log("Detected IP:", ip);
	// console.log("Location data:", location);

	//Redirect return
	// return NextResponse.redirect(QrData.destination_url, 302);
	return NextResponse.json({ success: true, QrData });
}
