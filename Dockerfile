FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /my-app

COPY . /my-app

RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
