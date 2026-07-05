# ============================================================
# Dockerfile — Frontend React (Vite)
# Projet     : Internal Developer Platform (IDP)
# Auteur     : Doaa Ben Marzouk
# École      : ENICarthage
# ============================================================

# ---- Étape 1 : Build -------------------------------------
FROM node:18-alpine AS build

WORKDIR /app

# Copier dépendances
COPY package.json package-lock.json ./

# Installer dépendances
RUN npm install

# Copier code source
COPY . .

# Builder avec Vite → génère /app/dist
RUN npm run build

# ---- Étape 2 : Production --------------------------------
FROM nginx:alpine

# Copier fichiers buildés dans Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copier config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]