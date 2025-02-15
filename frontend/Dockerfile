FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
