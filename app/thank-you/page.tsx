import type { Metadata } from "next";
import ConfirmationPanel from "@/app/components/ConfirmationPanel";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `You're on the list · ${BRAND.name}`,
  description: `Thanks for signing up. We'll write the moment ${BRAND.name} launches.`,
  robots: { index: false, follow: true },
};

export default function ThankYouPage(): JSX.Element {
  return <ConfirmationPanel />;
}
