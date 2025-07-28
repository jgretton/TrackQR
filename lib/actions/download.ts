import { QrCode } from "@/types/create";

export function handleQrDownload(qrcode: QrCode) {
	const base64Data = qrcode.qr_image_data; // "data:image/png;base64,iVBORw0KGgoAAAANS..."

	// Step 2: Convert base64 to blob
	const byteCharacters = atob(base64Data.split(",")[1]); // Remove "data:image/png;base64," part
	const byteNumbers = new Array(byteCharacters.length);
	for (let i = 0; i < byteCharacters.length; i++) {
		byteNumbers[i] = byteCharacters.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: "image/png" });

	// Step 3: Create download URL
	const url = URL.createObjectURL(blob);

	// Step 4: Create invisible link and click it
	const link = document.createElement("a");
	link.href = url;
	link.download = `${qrcode.name}-qr-code.png`; // Filename
	document.body.appendChild(link);
	link.click();

	// Step 5: Cleanup
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}
