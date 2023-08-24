import {
  AiOutlineCheckCircle,
  AiOutlineMinusCircle,
  AiOutlineCloseCircle,
  AiOutlineClockCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { ReactNode } from "react";
import { removeWhitespace } from "@/utils/string";

interface TaskCardProps {
  content: string[];
}

function statusLine(status: string): ReactNode {
  const parsed = removeWhitespace(status);

  if (parsed === "sucesso") {
    return (
      <>
        <AiOutlineCheckCircle className="text-green-500 text-lg" />
        <span className="text-green-500">Status: {status}</span>
      </>
    );
  }

  if (parsed === "pendente") {
    return (
      <>
        <AiOutlineMinusCircle className="text-yellow-500 text-lg" />
        <span className="text-yellow-500">Status: {status}</span>
      </>
    );
  }

  if (parsed === "falha") {
    return (
      <>
        <AiOutlineCloseCircle className="text-red-500 text-lg" />
        <span className="text-red-500">Status: {status}</span>
      </>
    );
  }
}

export default function TaskCard({ content }: TaskCardProps) {
  return (
    <section className="w-full max-w-[450px] px-2 py-4 shadow-lg rounded-lg">
      <h2 className="text-primary text-2xl font-semibold mb-2">Informações</h2>
      <div className="flex gap-2 text-description items-center">
        <AiOutlinePlayCircle className="text-primary text-lg" />{" "}
        <span>ID: {content[1]}</span>
      </div>
      <div className="flex gap-2 text-description items-center">
        {statusLine(content[2])}
      </div>
      <div className="flex gap-2 text-description items-center">
        <AiOutlineClockCircle className="text-primary text-lg" />{" "}
        <span>Data / Hora: {content[0]}</span>
      </div>
    </section>
  );
}
