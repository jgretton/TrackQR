import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function QrCodeSkeleton() {
	return (
		<Card className="relative overflow-hidden bg-white border-gray-200">
			{/* Status indicator */}
			<div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200" />

			<CardContent className="p-4">
				<div className="flex gap-3">
					{/* QR Code */}
					<div className="flex-shrink-0">
						<div className="size-20 rounded bg-white border border-gray-200 flex items-center justify-center">
							<Skeleton className="size-16" />
						</div>
					</div>

					{/* Main content */}
					<div className="flex-1 min-w-0">
						{/* Header row */}
						<div className="flex items-start justify-between gap-2 mb-2">
							<div className="min-w-0 flex-1">
								<Skeleton className="h-4 w-32 mb-1" />
								<div className="flex items-center gap-1">
									<Skeleton className="h-3 w-3" />
									<Skeleton className="h-3 w-40" />
								</div>
							</div>
							<Skeleton className="h-5 w-12" />
						</div>

						{/* Metrics row */}
						<div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
							<div className="flex items-center gap-4 text-xs">
								<div className="flex items-center gap-1">
									<Skeleton className="h-3 w-3" />
									<Skeleton className="h-3 w-16" />
								</div>
								<div className="flex items-center gap-1">
									<Skeleton className="h-3 w-3" />
									<Skeleton className="h-3 w-20" />
								</div>
							</div>

							{/* Actions */}
							<div className="flex flex-col sm:flex-row sm:items-center gap-1">
								<Skeleton className="h-7 w-20" />
								<Skeleton className="h-7 w-12" />
								<Skeleton className="h-7 w-20" />
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
