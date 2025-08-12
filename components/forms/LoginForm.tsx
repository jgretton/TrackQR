"use client";

import { handleLogin } from "@/lib/actions/auth";
import { LoginActionResponse } from "@/types/auth";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const initialState: LoginActionResponse = {
	success: false,
	message: "",
};

export default function LoginForm() {
	const [state, action, isPending] = useActionState(handleLogin, initialState);

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
			</div>
			<div className="grid gap-1.5 ">
				<Label htmlFor="password">Password</Label>
				<Input
					type="password"
					id="password"
					name="password"
					required
					autoComplete="current-password"
					defaultValue={state.inputs?.password}
				/>

				{state?.errors &&
					typeof state.errors === "object" &&
					"message" in state.errors && (
						<p className="text-xs text-red-500">{state.errors.message}</p>
					)}
			</div>
			<Button type="submit" disabled={isPending} variant={"default"}>
				{isPending ? "Logging in..." : "Login"}
			</Button>
			<div className="inline-flex gap-3">
				<p>Dont have an account?</p> <Link href="/auth/sign-up">Sign up</Link>
			</div>
		</form>
	);
}
