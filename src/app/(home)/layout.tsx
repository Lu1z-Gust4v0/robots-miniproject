import Navbar from "@/components/Navbar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
