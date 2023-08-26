import { LiaRobotSolid } from "react-icons/lia";

interface LoginLayoutProps {
  children: React.ReactNode;
}

function Header () {
  return (
    <header className="relative flex h-16 w-full px-4 shadow-md">
      <div className="flex items-center gap-2">
        <LiaRobotSolid className="text-primary/70 text-[2.25rem]" />
        <h2 className="text-xl text-description">UFC Autobots</h2>
      </div>
    </header>
  )
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
