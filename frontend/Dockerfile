
FROM node:14.13-alpine AS build

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]