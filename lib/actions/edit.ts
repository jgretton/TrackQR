"use server";

import { ValidationResponse } from "@/types/auth";
import { updateQRSchema } from "../validations/create";
import { QRFormData } from "@/types/create";
import { getCachedUser } from "../auth/cached-auth";
import { revalidatePath } from "next/cache";
import { invalidateQRCodesCache } from "./fetch";
import { prisma } from "@/lib/prisma";

export async function handleQrEdit(
	prevState: ValidationResponse | null,
	formData: FormData
): Promise<ValidationResponse> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const isActive = formData.get("is_active") === "on" ? true : false;
	const hasExpiry = formData.get("has-expiry") === "on";
	const expiryDateString = formData.get("expires_at") as string;

	let expires_at: Date | null = null;

	if (hasExpiry) {
		if (!expiryDateString) {
			return {
				success: false,
				message: "Please select an expiration date or disable expiry",
				errors: { expires_at: "Date required when expiry is enabled" },
			};
		}
		expires_at = new Date(expiryDateString);
	}
	let destination = formData.get("destination_url") as string;
	
	// Automatically prefix with https:// if no protocol is present
	if (destination && !destination.match(/^https?:\/\//)) {
		destination = `https://${destination}`;
	}

	const qrFormData: QRFormData = {
		name: formData.get("name") as string,
		destination: destination,
		expires_at: expires_at,
		is_active: isActive as boolean,
	};

	const validationData = updateQRSchema.safeParse(qrFormData);

	if (!validationData.success) {
		console.log(validationData);
		return {
			success: false,
			message: "Please fix the errors in the form",
			errors: validationData.error.flatten().fieldErrors,
			inputs: qrFormData,
		};
	}

	const user = await getCachedUser();

	if (!user?.id) {
		return {
			success: false,
			message: "User not authenticated",
		};
	}

	const qrID = formData.get("qr_id");
	try {
		await prisma.qrCode.update({
			where: {
				user_id: user.id,
				id: qrID as string,
			},
			data: {
				name: qrFormData.name,
				destination_url: qrFormData.destination,
				expires_at: qrFormData.expires_at,
				is_active: qrFormData.is_active,
				updated_at: new Date(),
			},
		});
		await invalidateQRCodesCache();
		revalidatePath("/", "layout");
		
		return {
			success: true,
			message: "QR code updated successfully",
		};
	} catch (error: unknown) {
		if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
			throw error;
		}

		console.log("Database error:", error);
		return {
			success: false,
			message: "Failed to create QR code",
		};
	}
}
