import { fetchAllQRCodes } from "@/lib/actions/fetch";
import { Button } from "./ui/button";
import QRCodeCard from "./QrCodeCard";
import { FetchAllReturn } from "@/types/create";
import Link from "next/link";
import { PlusIcon, QrCodeIcon } from "lucide-react";

export default async function QrCodeList() {
	const qrcodes: FetchAllReturn = await fetchAllQRCodes();
	if (!qrcodes.success || !qrcodes.data) {
		return <div>QR Code not found</div>;
	}

	return (
		<div className="">
			{qrcodes.data.length < 1 ? (
				<div className="flex flex-col items-center justify-center py-16 px-4">
					<div className="text-center space-y-4 max-w-md">
						<QrCodeIcon className="size-16 mx-auto text-gray-400" />
						<div className="space-y-2">
							<h3 className="text-lg font-semibold text-gray-900">
								No QR codes yet
							</h3>
							<p className="text-gray-600">
								Get started by creating your first QR code to track clicks and
								analytics.
							</p>
						</div>
						<Button className="inline-flex items-center gap-2 mt-6">
							<PlusIcon className="size-4" />
							<Link href={"/dashboard/create"}>Create Your First QR Code</Link>
						</Button>
					</div>
				</div>
			) : (
				<div className="">
					<div className="flex justify-between items-center">
						<h1 className="text-3xl text-gray-700 font-medium">Qr Codes</h1>
						<Button
							className="inline-flex items-center gap-2"
							variant="outline"
						>
							<PlusIcon className="size-4" />
							<Link href={"/dashboard/create"}>Create </Link>
						</Button>
					</div>
					<div className="grid gap-5 mt-10">
						{qrcodes.data?.map((qrcode) => (
							<QRCodeCard key={qrcode.id} qr={qrcode} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}
