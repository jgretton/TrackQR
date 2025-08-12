import { fetchChartData } from "@/lib/actions/fetch";
import { Chart } from "./Chart";

export async function DashboardChart() {
	const response = await fetchChartData();
	
	if (!response.success || !response.data) {
		return (
			<div className="p-4 text-center text-gray-500">
				{response.error || "Failed to load chart data"}
			</div>
		);
	}
	
	return (
		<div className="">
			<Chart data={response.data} />
		</div>
	);
}
