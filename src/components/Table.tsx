import { ReactNode } from "react";
import Link from "next/link";
import { removeWhitespace, isString } from "@/utils/string"

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

function statusToColor(status: string) {
  const parsed = removeWhitespace(status);

  if (parsed === "sucesso") {
    return <span className="text-green-500 font-semibold">{status}</span>
  } 
  
  if (parsed === "pendente") {
    return <span className="text-yellow-500 font-semibold">{status}</span>
  } 

  if (parsed === "falha") {
    return <span className="text-red-500 font-semibold">{status}</span>
  }
}

export function historyToRows(content: string[]): ReactNode[][] {
	const rows: ReactNode[][] = []

	content.forEach((element) => {
		const row: ReactNode[] = element.split(",")
 
    row[2] = statusToColor(isString(row[2]) ? row[2] : "")

		row.push(
			<Link 
        className="block hover:text-accent hover:scale-105 focus:text-accent focus:scale-105 transition-all duration-200 ease-out"
        key={row[0]?.toString()} 
        href={`/details/${row[1]}`}
      >
        Detalhes
      </Link>
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
		<table 
      className={`w-full min-h-[150px] min-w-[720px] shadow-lg rounded-t-lg overflow-hidden ${className}`}
    >
			{children}
		</table>
	)
}
