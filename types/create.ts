export interface QRFormData {
	name: string;
	destination: string;
	expires_at?: string;
	is_active?: boolean;
}

export interface QrCode {
	id: string;
	user_id: string;
	name: string;
	destination_url: string;
	redirect_code: string;
	qr_image_data: string;
	created_at: Date;
	updated_at: Date;
	expires_at?: Date | null;
	is_active: boolean;

	scans: string[];
}
