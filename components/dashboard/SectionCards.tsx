import { fetchDashboardData } from "@/lib/actions/fetch";
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function SectionCards() {
	const data = await fetchDashboardData();
	const { totalScans, topScanned, totalActive } = data.data || {};
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Scans</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{totalScans || 0}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="text-sm text-muted-foreground">
					{totalScans && totalScans > 0
						? "All-time interactions"
						: "Start creating QR codes"}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Most Popular QR Code</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
						{topScanned?.name || "No scans yet"}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">
						{topScanned?.scan_count
							? `${topScanned.scan_count} scans`
							: "No data yet"}
					</span>
					{topScanned?.id && (
						<Link
							href={`dashboard/qrcodes/${topScanned.id}`}
							className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors group hover:underline underline-offset-1"
						>
							View details{" "}
							<ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
						</Link>
					)}
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active QR Codes</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-xl">
						{totalActive?.length || 0}
					</CardTitle>
					<CardAction></CardAction>
				</CardHeader>
				<CardFooter className="text-sm text-muted-foreground">
					{totalActive && totalActive?.length > 0
						? "Live and tracking"
						: "Create your first code"}
				</CardFooter>
			</Card>
		</div>
	);
}
