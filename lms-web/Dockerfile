FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

ENV NODE_ENV=production

# Sirve la aplicación con un servidor estático (por ejemplo, serve)
RUN npm install -g serve

EXPOSE 3000
EXPOSE 5173

# CMD ["serve", "-s", "dist", "-l", "3000"]
CMD ["npm", "run", "dev", "--", "--host"]
