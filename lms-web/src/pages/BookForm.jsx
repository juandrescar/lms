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
    <div className="p-6 max-w-md mx-auto bg-surface rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Agregar Libro</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} className="input bg-background" placeholder="Título" />
        <input {...register("author", { required: true })} className="input bg-background" placeholder="Autor" />
        <input {...register("ISBN", { required: true })} className="input bg-background" placeholder="ISBN" />
        <input {...register("publication_year", { required: true })} type="number" className="input bg-background" placeholder="Año de publicación" />
        <select {...register("available")} className="input bg-background">
          <option value={1}>Disponible</option>
          <option value={0}>No disponible</option>
        </select>
        <button type="submit" className="btn text-white">Crear</button>
      </form>
    </div>
  );
}
