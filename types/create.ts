export interface QRFormData {
	name: string;
	destination: string;
	expires_at?: Date | null;
	is_active?: boolean;
	id?: string;
}

export interface QrCode {
	id: string;
	user_id: string;
	name: string;
	destination_url: string;
	redirect_code: string;
	qr_image_data?: string | null;
	created_at: Date;
	updated_at: Date;
	expires_at?: Date | null;
	is_active: boolean;
	_count?: {
		scans?: number;
	};

	scans?: Scans[];
}
export interface Scans {
	id: string;
	qr_code_id: string;
	scanned_at: Date;
	ip_address?: number;
	user_agent?: string;
	country?: string;
	city?: string;
	device_type?: string;
	referrer?: string;
}

export interface FetchAllReturn {
	success: boolean;
	error?: string;
	data?: QrCode[];
}
