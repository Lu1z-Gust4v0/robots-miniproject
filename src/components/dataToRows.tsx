import { ReactNode } from "react";
import { removeWhitespace, isString } from "@/utils/string"
import Link from "next/link";

// The use cannot send more than FILE_LIMIT files
const KYLOBYTE = 8 * 1024
const MEGABYTE = 8 * 1024 * 1024

export function fileSizeToString(size: number): string {
  if (size < KYLOBYTE) {
    return `${size} B`
  } else if (size >= KYLOBYTE && size < MEGABYTE) {
    return `${size / KYLOBYTE} KB`
  } else {
    return `${size / MEGABYTE} KB`
  } 
}

export function filesToRows(files: File[], remove: (name: string) => void): ReactNode[][] {
  const rows: ReactNode[][] = []
  
  files.forEach((file) => {
    const row: ReactNode[] = [
      file.name, 
      fileSizeToString(file.size),
      <button 
        className={
          "text-description font-semibold transition-colors duration-200 ease-out hover:text-red-500"
        }
        onClick={() => remove(file.name)}
        key={file.name}  
      >
        Remover
      </button>
    ] 
    
    rows.push(row)
  })

  return rows;
}

export function statusToColor(status: string) {
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

export function historyToRows(content: string[], botId: string): ReactNode[][] {
	const rows: ReactNode[][] = []

	content.forEach((element) => {
		const row: ReactNode[] = element.split(",")
 
    row[2] = statusToColor(isString(row[2]) ? row[2] : "")

		row.push(
			<Link 
        className="block hover:text-accent hover:scale-105 focus:text-accent focus:scale-105 transition-all duration-200 ease-out"
        key={row[0]?.toString()} 
        href={`/robot/${botId}/details/${row[1]}`}
      >
        Detalhes
      </Link>
		)
		rows.push(row)
	});

	return rows;
}

export function detailsToRows(content: string[]): ReactNode[][] {
  const rows: ReactNode[][] = []
  
  content.forEach((element) => {
    const row = element.split(",").slice(1)
  
    rows.push(row)
  })

  return rows
}
