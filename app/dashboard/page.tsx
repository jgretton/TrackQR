import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Dashboard() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}
	return (
		<div className="">
			<div className="max-w-md bg-white roudned-md p-3">
				<Button>
					<Link href={"/dashboard/create"}>Create New Qr Code</Link>
				</Button>
			</div>
		</div>
	);
}
