"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Table, TableBody, TableHeader } from "./Table";
import { filesToRows } from "./dataToRows";
import LinkButton from "./LinkButton";
import { useRouter } from 'next/navigation'

interface FileUploaderProps {
  botId: string;
}

// The use cannot send more than FILE_LIMIT files
const FILE_LIMIT = 5;

export default function FileUploader({ botId }: FileUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();

  function handleFileEvent(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files) return;

    if (files.length + uploadedFiles.length > FILE_LIMIT) {
      alert(`You cannot upload more than ${FILE_LIMIT} files`);
      // reset input value
      e.target.value = "";
      return;
    }

    const uploaded = [...uploadedFiles];

    for (let index = 0; index < files.length; index++) {
      // Make sure the user do not upload the same file again
      if (
        uploaded.findIndex((file) => file.name === files[index].name) === -1
      ) {
        uploaded.push(files[index]);
      }
    }

    setUploadedFiles(uploaded);
  }

  function removeFile(name: string) {
    const uploaded = uploadedFiles.filter((file) => file.name !== name);

    setUploadedFiles(uploaded);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (uploadedFiles.length === 0) {
      alert("No files to upload");
      return;
    }

    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append("file", file);
    });

    const response = await fetch(`/api/upload?id=${botId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Failed to upload data");
      return;
    }

    const data = await response.json();

    alert(data.message) 
    router.push(`/robot/${botId}`);
  }

  return (
    <section className="flex flex-col w-full py-4 gap-8">
      <form
        onSubmit={handleSubmit}
        className={`
          flex items-center justify-center h-[200px] w-full 
          p-4 rounded-lg shadow-lg
        `}
      >
        <input
          className={`
            ml-auto text-primary border border-description 
            px-4 py-2 rounded-lg hover:border-primary focus:outline-primary
            transition-colors duration-200 ease-out
          `}
          onChange={handleFileEvent}
          ref={fileInputRef}
          type="file"
          name="file"
          id="file"
          accept=".csv"
          multiple
        />
          <button
            type="submit"
            className={`
            ml-auto self-end block bg-primary text-white py-1 px-3 rounded-md 
            transition-all duration-200 ease-out 
            hover:scale-105 hover:bg-accent 
            focus:scale-105 focus:bg-accent
          `}>
            Executar
          </button>
      </form>
      <Table className="min-h-[100px]">
        <TableHeader headers={["Nome do Arquivo", "Tamanho (Bytes)", "Ação"]} />
        <TableBody rows={filesToRows(uploadedFiles, removeFile)} />
      </Table>

      <section className="flex w-full p-4 justify-end">
        <LinkButton path={`/robot/${botId}`}>Voltar</LinkButton>
      </section>
    </section>
  );
}
