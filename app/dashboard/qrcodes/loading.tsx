import { QrCodeSkeleton } from "@/components/qrcode/QRSkeleton";

export default function Loading() {
	// Or a custom loading skeleton component
	const array = new Array(6).fill(null);
	return (
		<div className="grid gap-2">
			{array.map((_, i) => (
				<QrCodeSkeleton key={i} />
			))}
		</div>
	);
}
