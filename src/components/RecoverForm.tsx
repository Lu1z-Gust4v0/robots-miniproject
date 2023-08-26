"use client"
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

interface FormData {
  email: string;
}

const DEFAULT_DATA = {
  email: "",
}

export default function RecoverForm() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target;

    setFormData((previous) => {
      return {
        ...previous,
        [target.name]: target.value,
      };
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const response = await fetch(`/api/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }
    setFormData(DEFAULT_DATA);
    alert(data.message);
  }

  return (
    <form
      className={`
        flex flex-col gap-4 w-full h-[250px] max-w-[350px] py-4 px-4 md:px-6
        shadow-lg rounded-lg
      `}
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary text-4xl font-bold mb-4">
        Recuperar Senha
      </h2>
      <div className="flex flex-col">
        <label
          className="text-description text-sm font-semibold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`
            w-full border border-description rounded-lg px-2 py-1 text-primary
            transition-all duration-200 ease-out focus:outline-primary  
          `}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
          placeholder="example@example.com"
          required
        />
      </div>
      <div className="flex">
        <Link
          href={"/login"}
          className="text-sm ml-auto block text-primary transition-all duration-200 ease-out hover:text-accent hover:scale-105 focus:text-accent focus:scale-105"
        >
          página de login
        </Link>
      </div>
      <button
        type="submit"
        className={`
          w-1/2 block bg-primary text-white mt-auto py-2 rounded-md 
          transition-all duration-200 ease-out 
          hover:scale-105 hover:bg-accent 
          focus:scale-105 focus:bg-accent
        `}
      >
        Recuperar 
      </button>
    </form>
  );
}
