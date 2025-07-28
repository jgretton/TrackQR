"use client";
import { handleSignup } from "@/lib/actions/auth";
import { SignUpActionResponse } from "@/types/auth";
import { useActionState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
const initialState: SignUpActionResponse = {
	success: false,
	message: "",
};

export default function SignUpForm() {
	const [state, action, isPending] = useActionState(handleSignup, initialState);

	return (
		<form action={action} className="grid gap-5 mt-10" autoComplete="on">
			<div className="grid gap-1.5 ">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					required
					autoComplete="email"
					defaultValue={state.inputs?.email}
				/>
				{state?.errors?.email &&
					state.errors.email.map((error, i) => (
						<p key={i} className="text-xs text-red-500">
							- {error}
						</p>
					))}
			</div>
			<div className="grid gap-1.5 ">
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					name="password"
					required
					defaultValue={state.inputs?.password}
				/>
				{state?.errors?.password &&
					state.errors.password.map((error, i) => (
						<p key={i} className="text-xs text-red-500">
							- {error}
						</p>
					))}
			</div>
			<div className="grid gap-1.5 ">
				<Label htmlFor="confirmPassword">Confirm password</Label>
				<Input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					required
					defaultValue={state.inputs?.confirmPassword}
				/>
				{state?.errors?.confirmPassword && (
					<p className="text-xs text-red-500">
						{state.errors.confirmPassword[0]}
					</p>
				)}
			</div>
			<Button type="submit" disabled={isPending}>
				{isPending ? "Signing up..." : "Sign up"}
			</Button>
			<div className="inline-flex gap-3">
				<p>Already have an account?</p> <Link href="/login">Log in</Link>
			</div>
		</form>
	);
}
