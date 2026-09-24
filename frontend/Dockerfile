FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_BACKEND_API_URL

ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL

RUN npm run build
CMD ["npm", "run", "start"]