import React, { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch?.("");
  };

  return (
    <div className={cn("relative", className)}>
<ApperIcon 
        name="Search" 
        size={18} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300"
      />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-blue-900/20 border border-blue-700/30 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
      />
      {value && (
        <button
onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-white transition-colors"
          >
            <ApperIcon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;