import Navbar from "@/components/Navbar"

interface HomeLayoutProps {
	children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
	return <section>
		<Navbar />
		{children}
	</section>
}