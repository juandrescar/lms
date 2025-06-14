import { useForm } from "react-hook-form";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";
import { createBook } from "../services/bookService";

export default function BookForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        await createBook(data);
        navigate("/books");
    } catch (err) {
        console.error("Error al crear libro", err);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Agregar Libro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} className="input" placeholder="Título" />
        <input {...register("author", { required: true })} className="input" placeholder="Autor" />
        <input {...register("ISBN", { required: true })} className="input" placeholder="ISBN" />
        <input {...register("publication_year", { required: true })} type="number" className="input" placeholder="Año de publicación" />
        <select {...register("available")} className="input">
          <option value={1}>Disponible</option>
          <option value={0}>No disponible</option>
        </select>
        <button type="submit" className="btn bg-blue-600 text-white">Crear</button>
      </form>
    </div>
  );
}
