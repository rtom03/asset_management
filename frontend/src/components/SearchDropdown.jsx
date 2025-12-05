import React, { useEffect, useRef, useState } from "react";
import { Input } from "./../components/ui/input";
const SearchDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }  
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);
  return (
    <div ref={ref} className="w-full">
         <Input placeholder="Enter search query" className="outline-none" />
    </div>
  );
};

export default SearchDropdown;
