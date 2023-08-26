const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center w-full border-t-2 border-primary h-20 text-pink">
      Quickmart @{currentYear}
    </div>
  );
};

export default Footer;
