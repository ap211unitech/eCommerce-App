import { Cormorant_Garamond as CormorantGaramond } from "next/font/google";

const CormorantFont = CormorantGaramond({
  subsets: ["latin-ext"],
  weight: ["700"],
});

const MainLogo = () => {
  return (
    <h1
      className={`text-pink px-6 py-4 font-semibold text-4xl cursor-pointer h-30 ${CormorantFont.className}`}
    >
      Quickmart
    </h1>
  );
};

export default MainLogo;
