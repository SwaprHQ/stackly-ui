"use client";

import { Icon } from "../icon/Icon";
import { twMerge } from "tailwind-merge";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ className, placeholder = "Search" }: SearchBarProps) => {
  return (
    <div
      className={twMerge(
        "flex items-center bg-surface-50 border border-surface-75 rounded-xl py-2 px-3",
        className
      )}
    >
      <Icon className="text-em-med" name="search" size={18} />
      <input
        className="outline-none font-semibold flex-grow ml-2 bg-surface-50"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
};

export default SearchBar;
