// app/browser-only.js
"use client";

import dynamic from "next/dynamic";

// Load the actual homepage UI only in the browser
const HomeClient = dynamic(() => import("./home-client"), { ssr: false });

export default function BrowserOnly({ blogs }) {
  return <HomeClient blogs={blogs} />;
}
