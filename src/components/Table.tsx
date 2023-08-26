import { ReactNode } from "react";

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
		<table 
      className={`w-full min-h-[150px] min-w-[720px] shadow-lg rounded-t-lg overflow-hidden ${className}`}
    >
			{children}
		</table>
	)
}
