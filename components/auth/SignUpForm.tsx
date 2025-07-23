"use client";
import { handleSignup } from "@/lib/actions/auth";
import { useActionState } from "react";
export default function SignUpForm() {
	const [state, action, isPending] = useActionState(handleSignup, null);
	return (
		<form action={action} className="grid gap-5 mt-10">
			<div className="grid gap-1.5 ">
				<label htmlFor="email" className="text-base font-normal text-gray-600">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
			</div>
			<div className="grid gap-1.5 ">
				<label
					htmlFor="password"
					className="text-base font-normal text-gray-600"
				>
					Password
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
			</div>
			<div className="grid gap-1.5 ">
				<label
					htmlFor="confirmPassword"
					className="text-base font-normal text-gray-600"
				>
					Confirm password
				</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white py-2 rounded-md"
				disabled={isPending}
			>
				{isPending ? "Signing up..." : "Sign up"}
			</button>
		</form>
	);
}
