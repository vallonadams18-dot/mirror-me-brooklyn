"use client";

import { useEffect } from "react";
import { SITE } from "@/lib/site";

/**
 * Sends the visitor straight on to Google's review box. `replace` rather than
 * `assign` so the back button returns them to wherever they came from instead
 * of bouncing through this page again. The page still renders a visible link
 * behind this, which is what runs if scripting is blocked.
 */
export function ReviewRedirect() {
  useEffect(() => {
    window.location.replace(SITE.googleWriteReviewUrl);
  }, []);

  return null;
}
