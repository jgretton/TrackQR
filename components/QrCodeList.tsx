import { QrCode } from "@/app/generated/prisma";
import { fetchAllQRCodes } from "@/lib/actions/fetch";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import QRCodeCard from "./QrCodeCard";

export default async function QrCodeList() {
	const qrcodes: { success: boolean; data?: QrCode[]; error?: string } =
		await fetchAllQRCodes();
	if (!qrcodes.success || !qrcodes.data) {
		return <div>QR Code not found</div>;
	}

	return (
		<div className="">
			<h1 className="text-3xl text-gray-700 font-medium">Qr Codes</h1>
			<div className=" mt-10">
				{qrcodes.data.length < 1 ? (
					<div className="mt-20 w-full bg-red-100">
						<div className="flex flex-col justify-center items-center w-full">
							<p>You currently have no codes create.</p>
							<Button>
								<PlusIcon className="size-4" /> Create QR Code
							</Button>
						</div>
					</div>
				) : (
					<div className="grid  gap-5">
						{qrcodes.data?.map((qrcode) => (
							<QRCodeCard key={qrcode.id} qr={qrcode} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
