"use server";

import { ValidationResponse } from "@/types/auth";
import { createQRSchema } from "../validations/create";
import { QRFormData } from "@/types/create";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";

import { PrismaClient } from "@/app/generated/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import QRCode from "qrcode";

const prisma = new PrismaClient();

export async function handleQrCreate(
	prevState: ValidationResponse | null,
	formData: FormData
) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const qrFormData: QRFormData = {
		name: formData.get("name") as string,
		destination: formData.get("destination") as string,
		expires_at: formData.get("expires_at") as string,
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

	const supabase = await createClient();
	const { data } = await supabase.auth.getClaims();
	const userId = data?.claims.sub;

	if (!userId) {
		return {
			success: false,
			message: "User not authenticated",
		};
	}

	// Generate unique redirect code
	const redirectCode = nanoid(10); // Nice short length

	const QRCodeGeneration = await QRCode.toDataURL(
		`https://localhost:3000/r/${redirectCode}`
	);

	try {
		const data = await prisma.qrCode.create({
			data: {
				name: qrFormData.name,
				destination_url: qrFormData.destination,
				expires_at: qrFormData.expires_at
					? new Date(qrFormData.expires_at)
					: null,

				redirect_code: redirectCode,
				is_active: true,
				user_id: userId,
				qr_image_data: QRCodeGeneration,
			},
		});

		const { id } = data;

		revalidatePath("/", "layout");
		redirect(`/dashboard/qrcodes/${id}`);
	} catch (error: any) {
		// If it's a redirect, let it through
		if (error?.message?.includes("NEXT_REDIRECT")) {
			throw error;
		}

		console.log("Database error:", error);
		return {
			success: false,
			message: "Failed to create QR code",
		};
	}
}
