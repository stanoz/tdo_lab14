FROM node:${NODE_VERSION}-alpine

ARG NODE_VERSION

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
