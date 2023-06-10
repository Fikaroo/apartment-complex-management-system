import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const SearchInput = ({ ref }: { ref: React.RefObject<string> }) => {
  const [val, SetVal] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    SetVal(e.target.value);

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        className="w-full px-4 py-2 transition-all bg-white border border-gray-300 rounded-full focus:outline-none focus:border-primary"
        placeholder="Search"
        value={val}
        onChange={handleSearchInput}
      />
      <MagnifyingGlassIcon className="absolute w-5 h-5 right-5 stroke-icon" />
    </div>
  );
};

export default SearchInput;
