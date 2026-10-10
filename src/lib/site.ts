export const site = {
  name: "Ludwing Valdés Reyes",
  github: "https://github.com/lilpne25-ui",
  // Set only after the address is confirmed for public use. Null hides it everywhere.
  email: null as string | null,
};

export function siteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
