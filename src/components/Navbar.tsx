"use client";
import { useState } from "react";
import Link from "next/link";
import { LiaRobotSolid } from "react-icons/lia";
import { IoMenuOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface NavItemProps {
  name: string;
  path: string;
}

interface LogoutButtonProps {
  name: string;
  logout: () => Promise<void>;
}

function LogoutButton({ name, logout }: LogoutButtonProps) {
  return (
    <button
      onClick={() => logout()}
      className="block text-description transition-all duration-200 ease-out hover:text-primary hover:scale-105 focus:text-primary focus:scale-105"
    >
      {name}
    </button>
  );
}

function MobileLogoutButton({ name, logout }: LogoutButtonProps) {
  return (
    <button
      onClick={() => logout()}
      className="text-primary text-center w-full py-2"
    >
      {name}
    </button>
  );
}

function NavItem({ name, path }: NavItemProps) {
  return (
    <li>
      <Link
        href={path}
        className="block text-description transition-all duration-200 ease-out hover:text-primary hover:scale-105 focus:text-primary focus:scale-105"
      >
        {name}
      </Link>
    </li>
  );
}

function MobileNavItem({ name, path }: NavItemProps) {
  return (
    <li className="text-primary text-center w-full py-2">
      <Link href={path}>{name}</Link>
    </li>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  function toggleMenu() {
    setOpen((prev) => (!prev));
  }

  async function logout() {
    const response = await fetch(
      "/api/logout",
      {
        method: "POST",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);
    router.push("/login");
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
        <NavItem path="/change-password" name="Alterar Senha" />
        <LogoutButton name="Encerrar Sessão" logout={logout} />
      </ul>
      <button className="ml-auto md:hidden" onClick={() => toggleMenu()}>
        <IoMenuOutline className="text-description text-2xl" />
      </button>
      {open && (
        <div className="absolute right-0 top-16 py-4 w-full bg-white shadow-md">
          <ul className="flex flex-col px-4">
            <MobileNavItem path="/change-password" name="Alterar Senha" />
            <MobileLogoutButton name="Encerrar Sessão" logout={logout} />
          </ul>
        </div>
      )}
    </nav>
  );
}
