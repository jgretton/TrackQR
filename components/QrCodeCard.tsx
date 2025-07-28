"use client";
import { QrCode } from "@/types/create";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
	BarChart,
	ChartNoAxesCombined,
	Download,
	Edit,
	LinkIcon,
	TimerResetIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { handleQrDownload } from "@/lib/actions/download";

export default function QRCodeCard({ qr }: { qr: QrCode }) {
	const {
		id,
		name,
		destination_url,
		redirect_code,
		qr_image_data,
		expires_at,
	} = qr;
	const expires_date = expires_at
		? new Date(expires_at).toDateString()
		: "Never";
	return (
		<Card>
			<CardHeader className="w-full grid grid-cols-1 md:grid-cols-2">
				<CardTitle className="text-xl md:text-2xl overflow-ellipsis">
					Qr code - {name}
				</CardTitle>
				<CardAction className="space-x-2">
					<Button variant={"outline"} size="default">
						<Link
							href={`/dashboard/qrcodes/${id}`}
							className="inline-flex gap-2 items-center"
						>
							<ChartNoAxesCombined className="size-4" />
							View Analytics
						</Link>
					</Button>
					<Button variant={"outline"} size="default">
						<Edit className="size-4" />
						Edit
					</Button>
					<Button onClick={() => handleQrDownload(qr)}>
						<Download className="size-4" />
						Download
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent className="grid grid-cols-1 md:grid-cols-[auto_1fr] w-full gap-6 items-center">
				<Card className="shrink-0 size-40 flex items-center justify-center bg-white">
					{qr_image_data ? (
						<Image
							src={qr_image_data}
							alt={`QR code for - ${name}`}
							className="w-32 h-32"
							width={128}
							height={128}
						/>
					) : (
						<div className="text-gray-500">No QR code generated</div>
					)}
				</Card>
				<Card className="flex-1 size-full">
					<CardContent className="grid justify-between h-full">
						<div className="">
							<p>{destination_url}</p>
						</div>
						<div className=" space-y-2">
							<div className=" flex flex-row flex-wrap gap-10">
								<p className="text-sm text-gray-700 inline-flex gap-1.5 items-center">
									<TimerResetIcon className="size-4" />
									Expires - {expires_date}
								</p>
								<p className="text-sm text-gray-700 inline-flex gap-1.5 items-center">
									<BarChart className="size-4" /> <strong>789</strong> views
								</p>
							</div>
							<p className="text-sm text-gray-700 inline-flex gap-1.5 items-center">
								<LinkIcon className="size-4" />
								trackqr/r/{redirect_code}
							</p>
						</div>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
