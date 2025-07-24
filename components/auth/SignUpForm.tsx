"use client";
import { handleSignup } from "@/lib/actions/auth";
import { SignUpActionResponse } from "@/types/auth";
import { useActionState } from "react";
const initialState: SignUpActionResponse = {
	success: false,
	message: "",
};

export default function SignUpForm() {
	const [state, action, isPending] = useActionState(handleSignup, initialState);

	console.log(state);
	return (
		<form action={action} className="grid gap-5 mt-10" autoComplete="on">
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
					defaultValue={state.inputs?.email}
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow "
				/>
				{state?.errors?.email &&
					state.errors.email.map((error, i) => (
						<p key={i} className="text-xs text-red-500">
							- {error}
						</p>
					))}
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
					defaultValue={state.inputs?.password}
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
				{state?.errors?.password &&
					state.errors.password.map((error, i) => (
						<p key={i} className="text-xs text-red-500">
							- {error}
						</p>
					))}
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
					defaultValue={state.inputs?.confirmPassword}
					className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
				/>
				{state?.errors?.confirmPassword && (
					<p className="text-xs text-red-500">
						{state.errors.confirmPassword[0]}
					</p>
				)}
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
