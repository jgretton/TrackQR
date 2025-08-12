import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function SectionCardSkeleton() {
	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription>
					<Skeleton className="h-4 w-24" />
				</CardDescription>
				<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<Skeleton className="h-8 w-16" />
				</CardTitle>
			</CardHeader>
			<CardFooter className="text-sm text-muted-foreground">
				<Skeleton className="h-4 w-32" />
			</CardFooter>
		</Card>
	);
}

export function SectionCardsSkeleton() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			<SectionCardSkeleton />
			<SectionCardSkeleton />
			<SectionCardSkeleton />
		</div>
	);
}