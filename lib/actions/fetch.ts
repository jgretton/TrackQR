import { unstable_cache } from "next/cache";
import { FetchAllReturn, ChartDataReturn, DashboardDataReturn } from "@/types/create";
import { getCachedUser } from "@/lib/auth/cached-auth";
import { prisma } from "@/lib/prisma";
import { success } from "zod";
import { random } from "nanoid";

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

export async function fetchDashboardData(): Promise<DashboardDataReturn> {
	const user = await getCachedUser();
	if (!user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const dashboardData = await prisma.qrCode.findMany({
			where: { user_id: user.id },
			include: {
				_count: { select: { scans: true } },
			},
			orderBy: { scan_count: "desc" },
		});
		const totalScans = dashboardData.reduce(
			(sum, qr) => sum + qr.scan_count,
			0
		);
		const topScanned = dashboardData[0];

		const totalActive = dashboardData.filter((qr) => qr.is_active === true);

		return {
			success: true,
			data: {
				totalScans: totalScans,
				topScanned: topScanned,
				totalActive: totalActive,
			},
		};
	} catch (error) {
		return { success: false, error: `There has been an error: ${error}` };
	}
}

export async function fetchChartData(): Promise<ChartDataReturn> {
	const user = await getCachedUser();
	if (!user?.id) {
		return { success: false, error: "Unauthorized" };
	}

	try {
		const data = await prisma.scan.findMany({
			where: {
				qr_code: {
					user_id: user.id,
				},
				scanned_at: {
					gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
				},
			},
			select: {
				scanned_at: true,
			},
			orderBy: {
				scanned_at: "desc",
			},
		});
		const returnData: { date: string; count: number }[] = [];
		const today = new Date();
		for (let index = 0; index <= 30; index++) {
			const date = new Date(today);
			date.setDate(today.getDate() - index);
			returnData[index] = {
				date: date.toISOString().split("T")[0],
				count: 0,
			};
		}
		data.forEach((scan) => {
			const dateString = scan.scanned_at.toISOString().split("T")[0];
			const existingItem = returnData.find((item) => item.date === dateString);
			if (existingItem) {
				existingItem.count++;
			}
		});

		return { success: true, data: returnData.reverse() };
	} catch (error) {
		throw { success: false, errorMessage: error };
	}
}
