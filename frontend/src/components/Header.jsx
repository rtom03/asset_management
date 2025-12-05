import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenuDemo from "./ui/dropdown";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const items = [
    {
      name: "Help",
      link: "/help",
    },
    {
      name: "Shortcuts",
      link: "/shortcuts",
    },
    {
      name: "Online",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      ),
      status: ["Away", "Do not disturb", "Ofline"],
    },
    {
      name: "Log Out",
    },
  ];

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
    <div className=" w-full flex items-center justify-end gap-1.5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
        />
      </svg>
      <div ref={ref} className="relative">
        <Button onClick={() => setOpen(!open)} className="cursor-pointer">
          <Avatar>
            <AvatarFallback>{user?.user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>

        {open && (
          <div className="absolute right-3.5 mt-2 w-24 bg-gray-800 text-gray-100 rounded-md border border-gray-700">
            <ul className="py-2">
              {items.map((item) => (
                <Link
                  to={item.link}
                  className="flex justify-between items-center px-4 text-xs py-2 hover:bg-gray-700 cursor-pointer"
                >
                  <li key={item} className="">
                    {item.name}
                  </li>
                  <li>{item.icon}</li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
