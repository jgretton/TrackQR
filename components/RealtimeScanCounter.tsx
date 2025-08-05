"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function RealtimeScanCounter({
	qrCodeId,
	initialCount,
}: {
	qrCodeId: string;
	initialCount: number;
}) {
	const [scanCount, setScanCount] = useState(initialCount);
	const supabase = createClient();

	useEffect(() => {
		const channel = supabase
			.channel("scans")
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "scans",
					filter: `qr_code_id=eq.${qrCodeId}`,
				},
				() => {
					setScanCount((prev) => prev + 1);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [qrCodeId, supabase]);

	return <span>{scanCount}</span>;
}
