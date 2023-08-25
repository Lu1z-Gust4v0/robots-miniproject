"use client";
import { ChangeEvent, FormEvent, useState } from "react";

interface FormData {
  user: string;
  password: string;
  year?: number;
  company: string;
}

const DEFAULT_DATA = {
  user: "",
  password: "",
  company: "",
};

export default function ConfirmDataForm() {
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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    console.log(formData);
  }

  return (
    <form
      className={`
        flex flex-col gap-4 w-full max-w-[400px] py-4 px-4 md:px-6
        shadow-lg rounded-lg
      `}
      onSubmit={handleSubmit}
    >
      <h3 className="text-description text-3xl font-semibold">
        Informe os dados
      </h3>
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
      <div className="flex flex-col">
        <label
          className="text-description text-sm font-semibold"
          htmlFor="year"
        >
          Ano
        </label>
        <input
          className={`
            w-full border border-description rounded-lg px-2 py-1 text-primary
            transition-all duration-200 ease-out focus:outline-primary  
          `}
          type="number"
          name="year"
          id="year"
          value={formData.year}
          onChange={handleChange}
          autoComplete="off"
          placeholder="2023"
          min={1970}
          required
        />
      </div>
      <div className="flex flex-col">
        <label
          className="text-description text-sm font-semibold"
          htmlFor="company"
        >
          Orgão
        </label>
        <input
          className={`
            w-full border border-description rounded-lg px-2 py-1 text-primary
            transition-all duration-200 ease-out focus:outline-primary  
          `}
          type="text"
          name="company"
          id="company"
          value={formData.company}
          onChange={handleChange}
          autoComplete="off"
          placeholder="UFC Autobots"
          required
        />
      </div>
      <button
        type="submit"
        className={`
          w-1/2 block bg-primary text-white mt-4 py-2 rounded-md 
          transition-all duration-200 ease-out 
          hover:scale-105 hover:bg-accent 
          focus:scale-105 focus:bg-accent
        `}
      >
        Confirmar
      </button>
    </form>
  );
}
