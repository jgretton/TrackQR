export interface LoginFormData {
	email: string;
	password: string;
}

export interface SignUpFormData {
	email: string;
	password: string;
	confirmPassword: string;
}
export interface LoginActionResponse {
	success: boolean;
	message: string;
	errors?:
		| {
				[K in keyof LoginFormData]?: string[];
		  }
		| AuthError;
	inputs?: LoginFormData;
}

export interface AuthError {
	message: string;
	code?: string;
}
export interface SignUpActionResponse {
	success: boolean;
	message: string;
	errors?: {
		[K in keyof SignUpFormData]?: string[];
	};
	inputs?: SignUpFormData;
	error?: string;
}
export interface ValidationResponse {
	success: boolean;
	message: string;
	errors?: any;
	inputs?: any;
	error?: string;
	qrCodeId?: string;
}
