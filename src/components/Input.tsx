import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Input = () => {
  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:bg-white focus:border-purple-500"
        placeholder="Search"
      />
      <MagnifyingGlassIcon className="absolute w-5 h-5 right-5 stroke-icon" />
    </div>
  );
};

export default Input;
