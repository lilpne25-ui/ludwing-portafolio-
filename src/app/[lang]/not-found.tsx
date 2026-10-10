import { NotFoundView } from "@/components/NotFoundView";

// Rendered for notFound() inside a locale. The segment has no access to params here,
// so it uses the default locale copy and offers both homepages.
export default function LocaleNotFound() {
  return <NotFoundView locale="en" />;
}
