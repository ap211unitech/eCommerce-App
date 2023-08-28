import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center gap-1 w-full border-t-[3px] absolute bottom-0 border-primary h-20 text-pink">
      <Link href={"/"} className="hover:underline">
        Quickmart
      </Link>
      @{currentYear}
    </div>
  );
};

export default Footer;
