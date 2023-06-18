"use client"
import { useState, useEffect } from 'react';
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  Bars2Icon,
} from "@heroicons/react/24/outline";
import Link from 'next/link';
 

// nav list component
const navListItems = [
  {
    label: "Pokemon",
    url: "/pokemon"
  },
  {
    label: "Owned Pokemon",
    url: "/owned"
  }
];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-8 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, url }) => (
        <Link key={label} href={url}>
          <Typography
            variant="small"
            className="text-lg text-blue-gray-300 font-bold hover:text-red-400 transition ease-in-out"
          >
            {label}
          </Typography>
        </Link>
      ))}
    </ul>
  );
}
 
const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);
 
  return (
    <Navbar className="py-8 mx-auto w-full lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default Nav;