FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN echo "MONGODB_URL=$(cat /etc/secrets/MONGODB_URL)" > .env
RUN npx prisma db push

FROM base AS build
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app /app
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]