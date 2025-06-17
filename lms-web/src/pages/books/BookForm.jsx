import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../services/bookService";
import { useState } from 'react';

export default function BookForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const onSubmit = async (data) => {
    setErrors({});

    try {
        await createBook(data);
        navigate("/books");
    } catch (err) {
      console.error("Error al crear libro", err);
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      }
        console.error("Error al crear libro", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-surface rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Agregar Libro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} className="input bg-background" placeholder="Título" />
        {errors.title && <p className="text-error text-sm">{errors.title[0]}</p>}
        <input {...register("author", { required: true })} className="input bg-background" placeholder="Autor" />
        {errors.authos && <p className="text-error text-sm">{errors.author[0]}</p>}
        <input {...register("ISBN", { required: true })} className="input bg-background" placeholder="ISBN" />
        {errors.ISBN && <p className="text-error text-sm">{errors.ISBN[0]}</p>}
        <input {...register("publication_year", { required: true })} type="number" className="input bg-background" placeholder="Año de publicación" />
        {errors.publication_year && <p className="text-error text-sm">{errors.publication_year[0]}</p>}
        <select {...register("available")} className="input bg-background">
          <option value={1}>Disponible</option>
          <option value={0}>No disponible</option>
        </select>
        {errors.available && <p className="text-error text-sm">{errors.available[0]}</p>}
        <button type="submit" className="btn text-white">Crear</button>
      </form>
    </div>
  );
}
