"use server";

import { ValidationResponse } from "@/types/auth";
import { createQRSchema } from "../validations/create";
import { QRFormData } from "@/types/create";
import { getCachedUser } from "@/lib/auth/cached-auth";
import { nanoid } from "nanoid";

import { PrismaClient } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { invalidateQRCodesCache } from "./fetch";

import QRCode from "qrcode";

const prisma = new PrismaClient();
async function generateUniqueRedirectCode(): Promise<string> {
	let attempts = 0;
	const maxAttempts = 10;

	while (attempts < maxAttempts) {
		const code = nanoid(10);

		// Check if this code already exists
		const existing = await prisma.qrCode.findUnique({
			where: { redirect_code: code },
		});

		if (!existing) {
			return code;
		}

		attempts++;
	}

	throw new Error("Unable to generate unique redirect code");
}

export async function handleQrCreate(
	prevState: ValidationResponse | null,
	formData: FormData
) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const expiresAtString = formData.get("expires_at") as string;
	const expires_at = expiresAtString ? new Date(expiresAtString) : null;

	let destination = formData.get("destination") as string;
	
	// Automatically prefix with https:// if no protocol is present
	if (destination && !destination.match(/^https?:\/\//)) {
		destination = `https://${destination}`;
	}

	const qrFormData: QRFormData = {
		name: formData.get("name") as string,
		destination: destination,
		expires_at: expires_at,
	};

	const validationData = createQRSchema.safeParse(qrFormData);

	if (!validationData.success) {
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

	// Generate unique redirect code
	const redirectCode = await generateUniqueRedirectCode();

	const QRCodeGeneration = await QRCode.toDataURL(
		`https://localhost:3000/r/${redirectCode}`
	);

	try {
		const data = await prisma.qrCode.create({
			data: {
				name: qrFormData.name,
				destination_url: qrFormData.destination,
				expires_at: qrFormData.expires_at,
				redirect_code: redirectCode,
				is_active: true,
				user_id: user.id,
				qr_image_data: QRCodeGeneration,
			},
		});

		const { id } = data;

		// Invalidate QR codes cache after creating
		await invalidateQRCodesCache();
		revalidatePath("/", "layout");
		redirect(`/dashboard/qrcodes/${id}`);
	} catch (error: unknown) {
		// If it's a redirect, let it through
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

export async function handleScanDataCreate(code: string) {
	// first check if the qr code exists.
	const QrCodeData = await prisma.qrCode.findUnique({
		where: {
			redirect_code: code,
		},
	});

	if (!QrCodeData)
		return {
			success: false,
			message: "No code.",
		};

	console.log(QrCodeData);
}
