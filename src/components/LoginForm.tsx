"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface FormData {
  user: string;
  password: string;
}

const DEFAULT_DATA = {
  user: "",
  password: "",
};

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>(DEFAULT_DATA);

  const router = useRouter();

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

    const response = await fetch(`/api/login`, {
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

    router.push("/");
  }

  return (
    <form
      className={`
        flex flex-col gap-4 w-full h-[450px] max-w-[350px] py-4 px-4 md:px-6
        shadow-lg rounded-lg
      `}
      onSubmit={handleSubmit}
    >
      <h2 className="text-primary text-4xl font-bold mb-4">
        Login
      </h2>
      <div className="flex flex-col">
        <label
          className="text-description text-sm font-semibold"
          htmlFor="user"
        >
          Usuário
        </label>
        <input
          className={`
            w-full border border-description rounded-lg px-2 py-1 text-primary
            transition-all duration-200 ease-out focus:outline-primary  
          `}
          type="text"
          name="user"
          id="user"
          value={formData.user}
          onChange={handleChange}
          autoComplete="off"
          placeholder="Gustavo Costa"
          required
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-description text-sm font-semibold"
          htmlFor="password"
        >
          Senha
        </label>
        <input
          className={`
            w-full border border-description rounded-lg px-2 py-1 text-primary
            transition-all duration-200 ease-out focus:outline-primary  
          `}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="senha"
          required
        />
      </div>
      <div className="flex">
        <Link
          href={"/recover"}
          className="text-sm ml-auto block text-primary transition-all duration-200 ease-out hover:text-accent hover:scale-105 focus:text-accent focus:scale-105"
        >
          Esqueci minha senha 
        </Link>
      </div>
      <button
        type="submit"
        className={`
          w-3/5 block bg-primary text-white mt-auto py-2 rounded-md 
          transition-all duration-200 ease-out 
          hover:scale-105 hover:bg-accent 
          focus:scale-105 focus:bg-accent
        `}
      >
        Logar
      </button>
    </form>
  );
}
