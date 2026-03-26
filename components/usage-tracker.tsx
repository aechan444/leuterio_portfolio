"use client";

import { useEffect } from "react";

export function UsageTracker() {
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/usage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType: "page_view",
        path: window.location.pathname,
        metadata: {
          referrer: document.referrer || null,
          userAgent: navigator.userAgent,
        },
      }),
      signal: controller.signal,
    }).catch(() => {
      return;
    });

    return () => controller.abort();
  }, []);

  return null;
}
