import Hero from "@/app/components/Hero";
import FleetPeek from "@/app/components/FleetPeek";
import TheStandard from "@/app/components/TheStandard";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams?: { error?: string };
}): JSX.Element {
  const initialError =
    typeof searchParams?.error === "string" && searchParams.error.length > 0
      ? decodeErrorParam(searchParams.error)
      : undefined;

  return (
    <>
      <Hero initialError={initialError} />
      <FleetPeek />
      <TheStandard />
    </>
  );
}

function decodeErrorParam(raw: string): string {
  // Whitelist a small set of server-side error tags so we never render
  // arbitrary text from the URL back to the user.
  switch (raw) {
    case "invalid_email":
      return "That doesn't look like a valid email address.";
    case "already_subscribed":
      return "You're already on the list — thanks for the enthusiasm!";
    case "server":
      return "Something went wrong on our side. Please try again in a moment.";
    default:
      return "We couldn't add you to the list. Please try again.";
  }
}

