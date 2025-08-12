import { SectionCards } from "@/components/SectionCards";
import { SectionCardsSkeleton } from "@/components/SectionCardsSkeleton";
import { Suspense } from "react";
import { DashboardChart } from "@/components/DashboardChart";

export default async function Dashboard() {
	return (
		<div className="">
			<h1 className="text-3xl text-gray-700 font-medium">Dashboard</h1>
			<div className="mt-10">
				<Suspense fallback={<SectionCardsSkeleton />}>
					<SectionCards />
				</Suspense>
				<div className=" mt-5">
					<DashboardChart />
				</div>
			</div>
		</div>
	);
}
