import Link from 'next/link'
import { LiaRobotSolid } from "react-icons/lia"

interface NavItemProps {
  name: string;
  path: string;
}

function NavItem({ name, path }: NavItemProps) {
  return <li className="text-description">
    <Link href={path}>{name}</Link>
  </li>
}

export default function Navbar() {
  return <nav className="flex h-16 w-full px-4 shadow-md">
    <div className="flex items-center gap-2">
      <Link href="/">
        <LiaRobotSolid 
          className="text-primary/70 text-[2.25rem]"
        />
      </Link>
      <h2 className="text-xl text-description">UFC Autobots</h2>
    </div>
    <ul className="flex items-center gap-4 ml-auto">
      <NavItem path="/" name="Alterar Senha" />
      <NavItem path="/" name="Encerrar Sessão" />
    </ul>
  </nav>
}
