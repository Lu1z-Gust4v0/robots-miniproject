import { ReactNode } from "react";
import Link from "next/link";

interface TableProps {
	children: ReactNode
	className?: string;
}

interface TableBodyProps {
	rows: ReactNode[][]
}

interface TableHeaderProps {
	headers: ReactNode[]
}

export function historyToRows(content: string[]): ReactNode[][] {
	const rows: ReactNode[][] = []

	content.forEach((element) => {
		const row: ReactNode[] = element.split(",")

		row.push(
			<Link key={row[0]?.toString()} href={`/details/${row[0]}`}>Detalhes</Link>
		)

		rows.push(row)
	});

	return rows;
}

export function TableHeader({ headers }: TableHeaderProps) {
	return <thead>
		<tr className="bg-primary">
			{headers.map((header, index) => {
				return (
					<th 
						className="text-start text-white text-xl px-4 py-2" 
						key={"table-header-" + index}
					>
						{header}
					</th>
				)
			})}
		</tr>
	</thead>
}

export function TableBody({ rows }: TableBodyProps) {
	return <tbody>
		{rows.map((row, index) => {
			const key = "table-row-" + index;
			return (
				<tr
					className="border-b border-description/50"
					key={key}
				>
					{row.map((field, index) => {
						return (
							<td
								className="px-4 py-2 text-description"
								key={`${key}-row-data-${index}`}
							>
								{field}
							</td>
						)
					})}
				</tr>
			)
		})}
	</tbody>
}

export function Table({ children, className }: TableProps) {
	return (
		<table className={`my-8 w-full ${className}`}>
			{children}
		</table>
	)
}