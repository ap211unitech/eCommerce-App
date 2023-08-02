import ThemeDropDown from "@/components/molecules/Theme";

const Navigation = () => {
  const categories = ["Men", "Women", "More", "Items"];

  return (
    <div className="flex flex-row justify-between items-center border-b-[1px] border-gray-300">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-pink px-6 py-4 font-semibold text-xl cursor-pointer">
          Quickmart
        </h1>
        <div className="flex flex-row justify-between items-center gap-4 px-2">
          {categories.map((c) => (
            <p className="dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700 cursor-pointer">
              {c}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center px-8 gap-6">
        <ThemeDropDown />
        <div>Profile</div>
        <div>Cart</div>
      </div>
    </div>
  );
};

export default Navigation;
