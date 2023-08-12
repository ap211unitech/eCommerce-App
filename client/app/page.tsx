import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("@/components/templates/Landing"), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}
