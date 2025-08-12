import { QrCodeSkeleton } from "@/components/qrcode/QRSkeleton";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	// Or a custom loading skeleton component
	return (
		<div className="grid gap-2">
			<QrCodeSkeleton />
			<Card className="min-h-screen w-full">
				<CardHeader>
					<Skeleton className="h-7 md:h-8 w-48" />
				</CardHeader>
			</Card>
		</div>
	);
}
