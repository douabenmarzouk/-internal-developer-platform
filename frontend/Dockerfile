# ============================================================
# Dockerfile — Frontend React (IDP)
# Auteur : Doaa Ben Marzouk
# Stage 1 : Build React avec Vite
# Stage 2 : Serve avec Nginx
# ============================================================

# ---- Stage 1 : Build --------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
# → génère /app/dist ✅ (Vite)

# ---- Stage 2 : Production Nginx ---------------------------
FROM nginx:alpine AS production

# Copier la config Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Supprimer les fichiers par défaut Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés par Vite
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
