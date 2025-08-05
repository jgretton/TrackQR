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
			.channel("qr_codes")
			.on(
				"postgres_changes",
				{
					event: "UPDATE",
					schema: "public",
					table: "qr_codes",
					filter: `id=eq.${qrCodeId}`,
				},
				(payload) => {
					// Update with the new scan_count from the database
					setScanCount(payload.new.scan_count);
				}
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [qrCodeId, supabase]);

	return <span>{scanCount}</span>;
}
