import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useState } from "react";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
        const res = await axios.post("/login", data);
        const userData = {
            id: res.data.user.id,
            name: res.data.user.name,
            role: res.data.user.role,
            token: res.data.token,
        };
        login(userData);
        navigate("/dashboard");
    } catch (err) {
        console.error(err);
        setServerError("Credenciales incorrectas o error del servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {serverError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {serverError}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            type="email"
            {...register("email", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded bg-background"
          />
          {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "Campo obligatorio" })}
            className="w-full border p-2 rounded bg-background"
          />
          {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-text-inverted py-2 rounded hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}