FROM node:alpine

WORKDIR /node-app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000
ENV MONGO_USER=root
ENV MONGO_PASSWORD=example

EXPOSE 4000

CMD [ "node", "server.js" ]

