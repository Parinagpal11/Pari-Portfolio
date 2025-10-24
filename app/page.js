// app/page.js
import { personalData } from "@/utils/data/personal-data";
import BrowserOnly from "./browser-only";

async function getData() {
  // Server-side fetch; revalidate hourly (tweak as you like)
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    // Avoid failing the whole build — return empty list
    return [];
  }

  const data = await res.json();

  // Keep posts that have a cover image and shuffle a bit
  return data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);
}

export default async function Page() {
  const blogs = await getData();
  return <BrowserOnly blogs={blogs} />;
}
