import { fetchQRCode } from "@/lib/actions/fetch";
import QrCodeCard from "@/components/qrcode/QrCodeCard";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { AnalyticsCards } from "@/components/analytics/AnalyticsCards";
import { AnalyticsGraph } from "@/components/analytics/AnalyticsGraph";

export default async function SingleQrCodePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const response = await fetchQRCode(id);

	if (!response.success || !response.data) {
		return <div>QR Code not found</div>;
	}
	const { QrData, averageDailyScans, lastScan, graphData } = response.data;
	return (
		<div className=" grid grid-cols-1 gap-10">
			<Link
				href="/dashboard/qrcodes"
				className="inline-flex items-center gap-0.5 text-gray-600 text-sm 
  hover:text-gray-900"
			>
				<ChevronLeftIcon className="size-4" /> Back to QR Codes
			</Link>
			<QrCodeCard qr={QrData} showAnalyticsButton={false} />
			<h2 className="text-xl font-semibold text-gray-700">Analytics</h2>
			<AnalyticsCards
				qrData={QrData}
				averageDailyScans={averageDailyScans}
				lastScan={lastScan}
			/>
			<AnalyticsGraph graphData={graphData} />
		</div>
	);
}
