import dynamic from "next/dynamic";

const LandingTemplate = dynamic(
  () => import("@/components/templates/Landing"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return (
    <>
      <LandingTemplate />
    </>
  );
}
