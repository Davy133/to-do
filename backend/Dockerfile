# Define build arguments
ARG MONGODB_USERNAME
ARG MONGODB_PASSWORD
ARG MONGODB_HOST
ARG MONGODB_URL
ARG JWT_SECRET
ARG IS_PRODUCTION
ARG GRAVATAR_API_KEY

FROM node:20-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma db push

FROM base AS build
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app /app

ENV MONGODB_USERNAME=${MONGODB_USERNAME} \
    MONGODB_PASSWORD=${MONGODB_PASSWORD} \
    MONGODB_HOST=${MONGODB_HOST} \
    MONGODB_URL=${MONGODB_URL} \
    JWT_SECRET=${JWT_SECRET} \
    IS_PRODUCTION=${IS_PRODUCTION} \
    GRAVATAR_API_KEY=${GRAVATAR_API_KEY}

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/server.js"]
