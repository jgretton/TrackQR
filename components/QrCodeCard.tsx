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
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import React from "react";
import { cn } from "@/lib/utils";
import { handleQrEdit } from "@/lib/actions/edit";
import { EditQrForm } from "./edit/EditQrForm";

export default function QRCodeCard({ qr }: { qr: QrCode }) {
	const {
		id,
		name,
		destination_url,
		redirect_code,
		qr_image_data,
		expires_at,
		is_active,
	} = qr;
	const expires_date = expires_at
		? new Date(expires_at).toDateString()
		: "Never";

	return (
		<Sheet>
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
						<SheetTrigger>
							<Button variant={"outline"} size="default">
								<Edit className="size-4" />
								Edit
							</Button>
						</SheetTrigger>
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
						<CardContent className="flex flex-col justify-around size-full">
							<div className="flex flex-row justify-between">
								<p>{destination_url}</p>
								<span
									className={`text-xs items-start px-2 py-1 rounded-full font-medium ${
										is_active
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									{is_active ? "Active" : "Inactive"}
								</span>
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

				<SheetContent>
					<SheetHeader>
						<SheetTitle>{qr.name}</SheetTitle>
						<SheetDescription>
							Make changes to the QR code here. Click save when you&apos;re
							done.
						</SheetDescription>
					</SheetHeader>
					<EditQrForm qr={qr} />
					<SheetFooter>
						<SheetClose asChild>
							<Button type="button" variant="outline">
								Close
							</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Card>
		</Sheet>
	);
}
