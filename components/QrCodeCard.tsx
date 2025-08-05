"use client";
import { QrCode } from "@/types/create";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
	BarChart3,
	Download,
	Edit,
	ExternalLink,
	TimerOffIcon,
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
import { EditQrForm } from "./edit/EditQrForm";
import { RealtimeScanCounter } from "./RealtimeScanCounter";
interface QrCodeCardProps {
	qr: QrCode;
	showAnalyticsButton?: boolean;
}

export default function QRCodeCard({
	qr,
	showAnalyticsButton,
}: QrCodeCardProps) {
	const {
		id,
		name,
		destination_url,
		qr_image_data,
		expires_at,
		is_active,
		scan_count,
	} = qr;
	const isExpired = expires_at ? new Date(expires_at) < new Date() : false;

	return (
		<Sheet>
			<Card
				className={`relative overflow-hidden transition-all duration-200 ${
					!is_active
						? "bg-gray-50 border-gray-200"
						: "bg-white hover:shadow-sm border-gray-200"
				}`}
			>
				{/* Status indicator */}
				<div
					className={`absolute top-0 left-0 right-0 h-0.5 ${
						!is_active
							? "bg-red-500"
							: isExpired
							? "bg-amber-500"
							: "bg-emerald-500"
					}`}
				/>

				<CardContent className="p-4">
					<div className="flex gap-3">
						{/* QR Code */}
						<div className="flex-shrink-0">
							<div className="size-20 rounded bg-white border border-gray-200 flex items-center justify-center">
								{qr_image_data ? (
									<Image
										src={qr_image_data}
										alt={`QR code for ${name}`}
										className="size-20"
										width={80}
										height={80}
									/>
								) : (
									<div className="text-gray-400 text-xs">⚡</div>
								)}
							</div>
						</div>

						{/* Main content */}
						<div className="flex-1 min-w-0">
							{/* Header row */}
							<div className="flex items-start justify-between gap-2 mb-2">
								<div className="min-w-0 flex-1">
									<h3 className="font-semibold text-gray-900 text-sm truncate">
										{name}
									</h3>
									<div className="flex items-center gap-1 text-xs text-gray-600 mt-0.5">
										<ExternalLink className="h-3 w-3 flex-shrink-0" />
										<Link
											href={destination_url}
											className="truncate font-mono hover:underline"
											target="_blank"
										>
											{destination_url.replace(/^https?:\/\//, "")}
										</Link>
									</div>
								</div>

								<div
									className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
										is_active
											? "bg-emerald-100 text-emerald-700"
											: "bg-red-100 text-red-700"
									}`}
								>
									{is_active ? "Live" : "Paused"}
								</div>
							</div>

							{/* Metrics row */}
							<div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
								<div className="flex items-center gap-4 text-xs text-gray-600">
									<div className="flex items-center gap-1">
										<BarChart3 className="h-3 w-3" />
										<span>
											<strong className="text-gray-900">
												<RealtimeScanCounter
													qrCodeId={id}
													initialCount={scan_count}
												/>
											</strong>{" "}
											{scan_count === 1 ? "scan" : "scans"}
										</span>
									</div>

									{expires_at ? (
										<div className="text-gray-500 flex items-center gap-1">
											<TimerOffIcon className="size-3 text-gray-700" />
											Expires{" "}
											{new Date(expires_at).toLocaleDateString("en-GB", {
												day: "numeric",
												month: "short",
											})}
										</div>
									) : (
										<div className="text-gray-500 flex items-center gap-1">
											<TimerOffIcon className="size-3 text-gray-700" />
											Never expires
										</div>
									)}
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row sm:items-center gap-1">
									{showAnalyticsButton !== false && (
										<Button
											variant="outline"
											size="sm"
											asChild
											className="h-7 px-2 text-xs"
										>
											<Link
												href={`/dashboard/qrcodes/${id}`}
												className="flex items-center gap-1"
											>
												<BarChart3 className="h-3 w-3" />
												<span className="">Analytics</span>
											</Link>
										</Button>
									)}

									<SheetTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-7 px-2 text-xs flex items-center gap-1"
										>
											<Edit className="h-3 w-3" />
											<span className="">Edit</span>
										</Button>
									</SheetTrigger>

									<Button
										variant="default"
										size="sm"
										onClick={() => handleQrDownload(qr)}
										className="h-7 px-2 text-xs flex items-center gap-1"
									>
										<Download className="h-3 w-3" />
										<span className="">Download</span>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<SheetContent side="right" className="w-full sm:w-auto">
				<SheetHeader>
					<SheetTitle>{qr.name}</SheetTitle>
					<SheetDescription>
						Make changes to the QR code here. Click save when you&apos;re done.
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
		</Sheet>
	);
}
