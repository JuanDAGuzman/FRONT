# Usa una imagen base de Node.js optimizada
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos necesarios
COPY frontend/package.json frontend/package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del frontend
COPY frontend ./

# Expone el puerto 5173
EXPOSE 5173

# Fija el comando de inicio para Vite
CMD ["npm", "run", "dev", "--", "--host"]
