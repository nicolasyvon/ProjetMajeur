FROM node:16-alpine 

WORKDIR /match_handler_service
COPY package.json .
RUN npm install
COPY . .
CMD npm start
