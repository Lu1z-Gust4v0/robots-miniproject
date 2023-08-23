import { ReactNode } from "react";

interface TableProps {
	children: ReactNode
}

interface TableBodyProps {
	rows: string[][]
}

interface TableHeaderProps {
	headers: string[]
}

export function contentToRows(content: string[]): string[][] {
	const rows: string[][] = []

	content.forEach((element) => {
		const row = element.split(",")

		rows.push(row)
	});

	return rows;
}

export function TableHeader({ headers }: TableHeaderProps) {
	return <thead>
		<tr>
			{headers.map((header, index) => {
				return <th key={header + index}>
					{header}
				</th>
			})}
		</tr>
	</thead>
}

export function TableBody({ rows }: TableBodyProps) {
	return <tbody>
		{rows.map((row, index) => {
			return <tr key={row[index] + index}>
				{row.map((field, index) => {
					return <td key={field + index}>{field}</td>
				})}
			</tr>
		})}
	</tbody>
}

export function Table({ children }: TableProps) {
	return (
		<table>
			{children}
		</table>
	)
}