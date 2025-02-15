FROM node:20-alpine AS build_image

WORKDIR /app/frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine AS production_image
WORKDIR /app/frontend

COPY --from=build_image /app/frontend/dist ./dist

EXPOSE 8080

COPY package.json .
COPY vite.config.ts .
RUN npm install typescript

EXPOSE 8080
CMD ["npm", "run", "preview"]