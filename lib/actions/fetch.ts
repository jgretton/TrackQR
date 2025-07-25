import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();

export async function fetchQRCode(id: string) {
	try {
		const QrData = await prisma.qrCode.findUnique({
			where: {
				id: id,
			},
		});

		if (!QrData) {
			return {
				success: false,
				data: null,
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
