# Etapa base
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias (solo las de producción)
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Establecer la variable de entorno para producción
ENV NODE_ENV=production
ENV PORT=8080

# Exponer el puerto (Fly usará 8080 internamente)
EXPOSE 8080

# Comando de arranque
CMD ["npm", "start"]
