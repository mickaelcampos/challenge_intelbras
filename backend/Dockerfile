
FROM node:14.14-alpine AS build

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]