import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { fetchQRCode } from "@/lib/actions/fetch";
import QRCodeCard from "@/components/QrCodeCard";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function SingleQrCodePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const QRData = await fetchQRCode(id);

	if (!QRData.success || !QRData.data) {
		return <div>QR Code not found</div>;
	}

	return (
		<div className=" grid grid-cols-1 gap-10">
			<Link
				href="/dashboard/qrcodes"
				className="inline-flex items-center gap-0.5 text-gray-600 text-sm 
  hover:text-gray-900"
			>
				<ChevronLeftIcon className="size-4" /> Back to QR Codes
			</Link>
			<QRCodeCard qr={QRData.data} showAnalyticsButton={false} />

			<Card>
				<CardHeader>
					<CardTitle>Analytics</CardTitle>
				</CardHeader>
			</Card>
		</div>
	);
}
