import QRCodeCard from "@/components/QrCodeCard";
import { fetchAllQRCodes } from "@/lib/actions/fetch";
import { QrCode } from "@/types/create";

export default async function QrCodesPage() {
	const qrcodes: { success: boolean; data?: QrCode[]; error?: string } =
		await fetchAllQRCodes();
	if (!qrcodes.success || !qrcodes.data) {
		return <div>QR Code not found</div>;
	}
	return (
		<div className="">
			<div className="">
				{!qrcodes.success ? (
					"No Codes"
				) : (
					<div className="grid  gap-5">
						{qrcodes.data?.map((qrcode) => (
							<QRCodeCard key={qrcode.id} qr={qrcode} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
