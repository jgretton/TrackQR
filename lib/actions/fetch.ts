import { PrismaClient } from "@/app/generated/prisma";
import { createClient } from "@/utils/supabase/server";
const prisma = new PrismaClient();

async function checkUser() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return user;
}

export async function fetchQRCode(id: string) {
	const user = await checkUser();
	if (!user) {
		return { success: false, error: "Unauthorized" };
	}
	try {
		const QrData = await prisma.qrCode.findUnique({
			where: {
				id: id,
				user_id: user?.id,
			},
		});

		if (!QrData) {
			return {
				success: false,
				error: "QR Code not found",
			};
		}

		return {
			success: true,
			data: QrData,
		};
	} catch (error) {
		throw error;
	}
}

export async function fetchAllQRCodes() {
	const user = await checkUser();
	if (!user) {
		return { success: false, error: "Unauthorized" };
	}
	try {
		const QRCodes = await prisma.qrCode.findMany();
		if (!QRCodes) {
			return {
				success: false,
				error: "There are no QR Codes",
			};
		}

		return {
			success: true,
			data: QRCodes,
		};
	} catch (error) {
		throw error;
	}
}
