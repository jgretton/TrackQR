"use client";

import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { handleQrDelete } from "@/lib/actions/delete";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTransition } from "react";

export function DeleteButton({ id }: { id: string }) {
	const [isPending, startTransition] = useTransition();
	const handleDelete = (id: string) => {
		startTransition(() => {
			handleQrDelete(id);
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="destructive"
					size="icon"
					className="h-7 px-2 text-xs flex items-center gap-1 w-full sm:w-auto"
				>
					<Trash2 className="h-3 w-3" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Are you sure you want to delete this QR Code?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanantly delete the
						QRCode and all the analytical data associated with it.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="default" disabled={isPending}>
							Close
						</Button>
					</DialogClose>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={() => handleDelete(id)}
					>
						{isPending ? (
							<span className="inline-flex items-center gap-1">
								<Loader2 className="size-4 animate-spin" />
								Deleting...
							</span>
						) : (
							"Confirm"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
