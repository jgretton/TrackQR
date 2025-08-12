import CreateQrForm from "@/components/forms/CreateQrForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function CreatePage() {
	return (
		<div className="size-full">
			<Card>
				<CardHeader>
					<CardTitle>Create Qr Code</CardTitle>
					<CardDescription>
						Fill out the form below to create your QR code
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="">
						<CreateQrForm />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
