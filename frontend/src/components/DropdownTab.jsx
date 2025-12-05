import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DropdownTab = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        className={`${
          open ? "border border-indigo-400" : "hover:bg-gray-700/30"
        }
        `}
      >
        {label}
      </Button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-gray-100 shadow-lg rounded-md border border-gray-700 z-50">
          <ul className="py-2">
            {items.map((item) => (
              <Link to={item.link}>
                <li
                  key={item}
                  className="px-4 text-xs py-2 hover:bg-gray-700 cursor-pointer"
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownTab;
