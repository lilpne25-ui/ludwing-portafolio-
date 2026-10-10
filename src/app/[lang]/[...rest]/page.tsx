import { notFound } from "next/navigation";

// Any unknown path under /en or /es renders the designed 404 page.
export default function CatchAll() {
  notFound();
}
