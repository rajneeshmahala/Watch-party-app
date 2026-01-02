
FROM node:20-alpine
WORKDIR /app
COPY package.json vite.config.js ./
RUN npm install
COPY src ./src
CMD ["npm","run","dev"]
