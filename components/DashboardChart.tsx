import { fetchChartData } from "@/lib/actions/fetch";
import { Chart } from "./Chart";

export async function DashboardChart() {
	const data = await fetchChartData();
	return (
		<div className="">
			<Chart data={data.data} />
		</div>
	);
}
