import { Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="m-3 md:hidden">
      <div className="flex justify-between items-center border rounded-3xl px-3 py-1 space-x-10">
        <div className="flex items-center space-x-4" onClick={toggleOpen}>
          <Search height={20} width={20} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Anywhere</span>
            <span className="text-xs">Any week</span>
          </div>
        </div>
        <SlidersHorizontal className="text-right" />
      </div>
      {open && (
        <div className="mt-2 bg-white rounded-md shadow-lg p-2">
     
        </div>
      )}
    </div>
  );
}
