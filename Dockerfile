FROM node:8-alpine

COPY ./src /opt/src
COPY ./package.json /opt/package.json
COPY ./package-lock.json /opt/package-lock.json
RUN cd /opt && npm install

EXPOSE 3000

CMD [ "npm", "run", "start" ]
WORKDIR /opt
