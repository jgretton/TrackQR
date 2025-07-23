"use client";

import { handleLogin } from "@/lib/actions/auth";
import { useActionState } from "react";

export default function LoginForm() {
	const [state, action, isPending] = useActionState(handleLogin, null);

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
					autoComplete="email"
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
					autoComplete="current-password"
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-600 text-white py-2 rounded-md"
				disabled={isPending}
			>
				{isPending ? "Logging in..." : "Login"}
			</button>
		</form>
	);
}
