import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const LandingTemplate = dynamic(
  () => import("@/components/templates/Landing"),
  {
    loading: () => (
      <p>
        <Loader2 className="animate-spin mx-auto mt-6 mb-3" />
        Loading Landing page...
      </p>
    ),
  }
);

export default function Home() {
  return (
    <>
      <LandingTemplate />
    </>
  );
}
