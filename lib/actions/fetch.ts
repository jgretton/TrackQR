import { unstable_cache } from "next/cache";
import { FetchAllReturn } from "@/types/create";
import { getCachedUser } from "@/lib/auth/cached-auth";
import { prisma } from "@/lib/prisma";

// Internal cached function that takes userId as parameter
const fetchQRCodeInternal = unstable_cache(
	async (id: string, userId: string) => {
		const QrData = await prisma.qrCode.findUnique({
			where: {
				id: id,
				user_id: userId,
			},
			include: {
				scans: { orderBy: { scanned_at: "desc" } },
				_count: { select: { scans: true } },
			},
		});

		return QrData;
	},
	["single-qr-code"],
	{
		tags: ["qr-codes"],
		revalidate: 300,
	}
);

// Public function that handles auth outside cache
export async function fetchQRCode(id: string) {
	const user = await getCachedUser();
	if (!user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const QrData = await fetchQRCodeInternal(id, user.id);

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

// Internal cached function that takes userId as parameter
const fetchAllQRCodesInternal = unstable_cache(
	async (userId: string) => {
		const QRCodes = await prisma.qrCode.findMany({
			where: { user_id: userId },
			orderBy: { created_at: "desc" },
		});

		return QRCodes;
	},
	["user-qr-codes"], // Cache key
	{
		tags: ["qr-codes"], // For invalidation
		revalidate: 30, // 30 seconds
	}
);

// Public function that handles auth outside cache
export async function fetchAllQRCodes(): Promise<FetchAllReturn> {
	const user = await getCachedUser();
	if (!user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const QRCodes = await fetchAllQRCodesInternal(user.id);

		return {
			success: true,
			data: QRCodes,
		} as FetchAllReturn;
	} catch (error) {
		throw error;
	}
}
// Cache invalidation helper
export async function invalidateQRCodesCache() {
	const { revalidateTag } = await import("next/cache");
	revalidateTag("qr-codes");
}
