import { LoginForm } from "@/components/forms/LoginForm";

export default function Page() {
	return (
		<div className="min-h-screen bg-gray-50 p-4 grid place-items-center">
			<div className="max-w-lg mx-auto w-full h-auto bg-white rounded-lg p-4 shadow-md">
				<div className="">
					<h2 className="text-3xl font-semibold">Log in</h2>
				</div>
				<LoginForm />
			</div>
		</div>
	);
}
