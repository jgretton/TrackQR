"use client";

import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { handleQrCreate } from "@/lib/actions/create";

export default function CreateQrForm() {
	const [open, setOpen] = React.useState(false);
	const [date, setDate] = React.useState<Date | undefined>();

	const [state, action, isPending] = useActionState(handleQrCreate, null);

	return (
		<form className="grid gap-4" autoComplete="off" action={action}>
			<div className="space-y-2">
				<Label htmlFor="name"> QR code name</Label>
				<Input
					type="text"
					name="name"
					id="name"
					autoComplete="off"
					defaultValue={state?.inputs?.name}
				/>
				{state?.errors?.name && (
					<p className="text-sm text-red-500"> {state.errors.name}</p>
				)}
			</div>
			<div className="space-y-2">
				<Label htmlFor="destination"> Destination</Label>
				<p className="text-sm text-gray-500">
					Enter the URL you want the QR code to redirect to (https:// will be
					added automatically)
				</p>
				<div className="relative">
					<span
						className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 cursor-text select-none"
						onClick={() => document.getElementById("destination")?.focus()}
					>
						https://
					</span>
					<Input
						type="text"
						name="destination"
						id="destination"
						className="pl-16"
						placeholder="example.com"
						defaultValue={state?.inputs?.destination}
					/>
				</div>
				{state?.errors?.destination && (
					<p className="text-sm text-red-500"> {state.errors.destination}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="name"> Expires at</Label>
				<p className="text-sm text-gray-500">
					(Optional) - Sets a date for when the QR will expire
				</p>
				<input
					type="hidden"
					name="expires_at"
					value={date?.toISOString().split("T")[0] || ""}
				/>
				<div className="relative flex gap-2">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn("w-[240px] pl-3 text-left font-normal")}
							>
								{date ? date?.toLocaleDateString() : <span>Pick a date</span>}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(date) => {
									setDate(date);
									setOpen(false);
								}}
								disabled={(date) =>
									date < new Date() || date < new Date("1900-01-01")
								}
								captionLayout="dropdown"
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			<Button type="submit" variant={"default"} disabled={isPending}>
				{isPending ? (
					<span className="inline-flex gap-2 items-center">
						<Loader2 className="size-4 animate-spin" /> Creating
					</span>
				) : (
					"Create"
				)}
			</Button>
		</form>
	);
}
