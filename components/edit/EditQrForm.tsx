import { handleQrEdit } from "@/lib/actions/edit";
import { QrCode } from "@/types/create";
import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export function EditQrForm({ qr }: { qr: QrCode }) {
	const [open, setOpen] = useState(false);
	const [hasExpiry, setHasExpiry] = useState(!!qr.expires_at);
	const [expiryDate, setExpiryDate] = useState(
		qr.expires_at ? new Date(qr.expires_at) : undefined
	);
	const [active, setActive] = useState(qr.is_active);
	const initialState = {
		success: false,
		message: "",
	};

	const [state, action, isPending] = useActionState(handleQrEdit, initialState);

	console.log(state);

	return (
		<form action={action} className="flex flex-col justify-between h-full">
			<input type="hidden" name="qr_id" value={qr.id} />
			<div className="grid flex-1 auto-rows-min gap-6 px-4">
				<div className="grid gap-3">
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" defaultValue={qr.name} />
				</div>
				<div className="grid gap-3">
					<Label htmlFor="destination_url">Destination URL</Label>
					<div className="relative">
						<span
							className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-text select-none"
							onClick={() =>
								document.getElementById("destination_url")?.focus()
							}
						>
							https://
						</span>
						<Input
							id="destination_url"
							name="destination_url"
							className="pl-16"
							placeholder="example.com"
							defaultValue={
								qr.destination_url?.replace(/^https:\/\//, "") || ""
							}
						/>
					</div>
				</div>
				<div className="grid gap-3">
					<Label htmlFor="expires_at" className="flex items-center gap-5">
						Expiry date
						<Switch
							id="has-expiry"
							name="has-expiry"
							checked={hasExpiry}
							onCheckedChange={(checked) => {
								setHasExpiry(checked);
								if (!checked) {
									setExpiryDate(undefined); // Clear date when disabled
								}
							}}
						/>
					</Label>
					<input
						type="hidden"
						name="expires_at"
						value={expiryDate?.toISOString().split("T")[0] || ""}
					/>
					{hasExpiry && (
						<div className="relative flex flex-col gap-2">
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn("w-[240px] pl-3 text-left font-normal")}
									>
										{expiryDate ? (
											expiryDate?.toLocaleDateString()
										) : (
											<span>Pick a date</span>
										)}
										<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={expiryDate}
										onSelect={(date) => {
											setExpiryDate(date);
											setOpen(false);
										}}
										disabled={(date) =>
											date < new Date() || date < new Date("1900-01-01")
										}
										captionLayout="dropdown"
									/>
								</PopoverContent>
							</Popover>
							{/* Show current status */}
							<p className="text-xs text-muted-foreground">
								{hasExpiry
									? expiryDate
										? `QR code will expire on ${expiryDate.toLocaleDateString()}`
										: "Please select an expiration date"
									: "QR code will never expire"}
							</p>
						</div>
					)}
				</div>
				<div className="grid gap-3">
					<div className="inline-flex items-center gap-3">
						<Label htmlFor="is_active">Status</Label>
						<span
							className={`text-xs px-2 py-1 rounded-full font-medium ${
								active
									? "bg-green-100 text-green-700"
									: "bg-red-100 text-red-700"
							}`}
						>
							{active ? "Active" : "Inactive"}
						</span>
					</div>
					<Switch
						name="is_active"
						checked={active}
						onCheckedChange={() => setActive(!active)}
						className="data-[state=checked]:bg-green-500 "
					/>
				</div>
			</div>
			<div className="w-full p-4">
				<Button className="w-full" type="submit" disabled={isPending}>
					{isPending ? (
						<span className="inline-flex items-center gap-3">
							<Loader2 className="size-4" />
							Saving Changes...
						</span>
					) : (
						"Save changes"
					)}
				</Button>
			</div>
		</form>
	);
}
