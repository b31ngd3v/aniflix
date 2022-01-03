FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=3000

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start" ]