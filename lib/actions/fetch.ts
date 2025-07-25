import { PrismaClient } from "@/app/generated/prisma";
import { createClient } from "@/utils/supabase/server";
const prisma = new PrismaClient();

export async function fetchQRCode(id: string) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
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
