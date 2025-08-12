import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow, format } from 'date-fns';
import { QrCode } from "@/types/create";

interface AnalyticsCardsProps {
	qrData: QrCode;
	averageDailyScans: number;
	lastScan: Date;
}

export function AnalyticsCards({ qrData, averageDailyScans, lastScan }: AnalyticsCardsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Daily Average</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{averageDailyScans ? Math.round(averageDailyScans) : 0}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="text-sm text-muted-foreground">
					{averageDailyScans > 0 
						? `${averageDailyScans.toFixed(1)} scans per day`
						: "No activity yet"}
				</CardFooter>
			</Card>
			
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Last Activity</CardDescription>
					<CardTitle className="text-2xl font-semibold @[250px]/card:text-xl">
						{lastScan 
							? formatDistanceToNow(new Date(lastScan), {addSuffix: true})
							: "Never"}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="text-sm text-muted-foreground">
					{lastScan 
						? `on ${format(new Date(lastScan), 'MMM d, yyyy')}`
						: "No scans recorded"}
				</CardFooter>
			</Card>
			
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Scans</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{qrData.scan_count || 0}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="text-sm text-muted-foreground">
					{qrData.scan_count > 0 ? "All-time activity" : "Start sharing your code"}
				</CardFooter>
			</Card>
		</div>
	);
}