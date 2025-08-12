import { Suspense } from "react";
import Loading from "./loading";
import QrCodeList from "@/components/qrcode/QrCodeList";

export default async function QrCodesPage() {
	return (
		<div className="">
			<Suspense fallback={<Loading />}>
				<QrCodeList />
			</Suspense>
		</div>
	);
}
