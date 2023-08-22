import { useState } from "react";
import Link from "next/link";
import { LiaRobotSolid } from "react-icons/lia";
import { IoMenuOutline } from "react-icons/io5";

interface NavItemProps {
  name: string;
  path: string;
}

function NavItem({ name, path }: NavItemProps) {
  return (
    <li className="text-description transition-all duration-200 ease-out hover:text-primary hover:scale-105">
      <Link href={path}>{name}</Link>
    </li>
  );
}

function MobileNavItem({ name, path }: NavItemProps) {
  return (
    <li className="text-primary text-center w-full py-2 ">
      <Link href={path}>{name}</Link>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  function toggleMenu() {
    setOpen((prev) => (!prev));
  }

  return (
    <nav className="relative flex h-16 w-full px-4 shadow-md">
      <div className="flex items-center gap-2">
        <Link href="/">
          <LiaRobotSolid className="text-primary/70 text-[2.25rem]" />
        </Link>
        <h2 className="text-xl text-description">UFC Autobots</h2>
      </div>
      <ul className="hidden md:flex items-center gap-4 ml-auto">
        <NavItem path="/" name="Alterar Senha" />
        <NavItem path="/" name="Encerrar Sessão" />
      </ul>
      <button className="ml-auto md:hidden" onClick={() => toggleMenu()}>
        <IoMenuOutline className="text-description text-2xl" />
      </button>
      {open && (
        <div className="absolute right-0 top-16 py-4 w-full bg-white shadow-md">
          <ul className="flex flex-col px-4">
            <MobileNavItem path="/" name="Alterar Senha" />
            <MobileNavItem path="/" name="Encerrar Sessão" />
          </ul>
        </div>
      )}
    </nav>
  );
}
