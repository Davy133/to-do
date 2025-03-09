FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

FROM base AS build
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /app /app
RUN npm install --omit=dev

CMD ["node", "dist/server.js"]

# FROM base AS development
# CMD ["npm", "run", "dev"]
