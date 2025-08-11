"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";

export async function handleQrDelete(QRID: string) {
	try {
		await prisma.qrCode.delete({
			where: {
				id: QRID,
			},
		});
		revalidatePath("/", "layout");
		redirect(`/dashboard/qrcodes`);
	} catch (error) {
		console.log("Error deleting : ", error);
		throw error;
	}
}
