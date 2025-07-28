import { PrismaClient } from "@/app/generated/prisma";
import { QrCode } from "@/types/create";
import { getCachedUser } from "@/lib/auth/cached-auth";
const prisma = new PrismaClient();

export async function fetchQRCode(id: string) {
	const user = await getCachedUser();
	if (!user?.id) {
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
interface FetchAllReturn {
	success: boolean;
	error?: string;
	data?: QrCode[];
}
export async function fetchAllQRCodes(): Promise<FetchAllReturn> {
	const user = await getCachedUser();
	if (!user?.id) {
		return { success: false, error: "Unauthorized" };
	}
	try {
		const QRCodes = await prisma.qrCode.findMany({
			where: { user_id: user.id },
		});
		if (!QRCodes) {
			return {
				success: false,
				error: "There are no QR Codes",
			};
		}

		return {
			success: true,
			data: QRCodes,
		} as FetchAllReturn;
	} catch (error) {
		throw error;
	}
}
