FROM node:12.15

WORKDIR /src/node

CMD [ "npm", "run", "start:dev" ]