FROM node

RUN mkdir -p /testapp

COPY . /testapp

WORKDIR /testapp

RUN npm i

CMD [ "node", "/testapp/server.js" ]