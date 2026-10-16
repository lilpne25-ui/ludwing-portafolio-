export const site = {
  name: "Ludwing Valdés Reyes",
  github: "https://github.com/lilpne25-ui",
  // Confirmed by Ludwing for public use. Null hides either one everywhere.
  email: "ludwingvaldes442@gmail.com" as string | null,
  phone: { display: "+52 442 975 0295", tel: "+524429750295" } as { display: string; tel: string } | null,
};

export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
