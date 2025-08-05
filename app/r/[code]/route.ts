import { NextRequest, NextResponse, userAgent } from "next/server";
import { ipAddress, geolocation } from "@vercel/functions";
import { Scan } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";

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

	// Collect analytics data
	const locationData = geolocation(req);
	const user_agent = userAgent(req);

	try {
		await prisma.scan.create({
			data: {
				qr_code_id: QrData.id,
				scanned_at: new Date(),
				user_agent: user_agent.ua || null,
				country: locationData?.country || null,
				city: locationData?.city || null,
				device_type: user_agent.device?.type || null,
				referrer: req.headers.get("referer") || null,
			},
		});

		// Invalidate QR codes cache after scan
		const { revalidateTag } = await import("next/cache");
		revalidateTag("qr-codes");
	} catch (error) {
		console.error("Failed to record scan:", error);
		// Continue with redirect even if scan recording fails
	}

	return NextResponse.redirect(QrData.destination_url, 302);
}
