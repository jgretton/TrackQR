import LoginForm from "@/components/auth/LoginForm";

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50 p-20">
			<div className="max-w-lg mx-auto h-auto bg-white rounded-lg p-4 shadow-md">
				<div className="">
					<h2 className="text-3xl font-semibold">Log in</h2>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
