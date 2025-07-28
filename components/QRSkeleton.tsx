import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function QrCodeSkeleton() {
	return (
		<Card>
			<CardHeader className="w-full grid grid-cols-1 md:grid-cols-2">
				<Skeleton className="h-7 md:h-8 w-48" />

				<div className="space-x-2 flex justify-start md:justify-end">
					<Skeleton className="h-10 w-32" />
					<Skeleton className="h-10 w-16" />
					<Skeleton className="h-10 w-24" />
				</div>
			</CardHeader>

			<CardContent className="grid grid-cols-1 md:grid-cols-[auto_1fr] w-full gap-6 items-center">
				<Card className="shrink-0 size-40 flex items-center justify-center bg-white">
					<Skeleton className="w-32 h-32" />
				</Card>

				<Card className="flex-1 size-full">
					<CardContent className="grid justify-between h-full">
						<div className="">
							<Skeleton className="h-5 w-64" />
						</div>

						<div className="space-y-2">
							<div className="flex flex-row flex-wrap gap-10">
								<div className="inline-flex gap-1.5 items-center">
									<Skeleton className="size-4" />
									<Skeleton className="h-4 w-24" />
								</div>
								<div className="inline-flex gap-1.5 items-center">
									<Skeleton className="size-4" />
									<Skeleton className="h-4 w-16" />
								</div>
							</div>

							<div className="inline-flex gap-1.5 items-center">
								<Skeleton className="size-4" />
								<Skeleton className="h-4 w-32" />
							</div>
						</div>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
