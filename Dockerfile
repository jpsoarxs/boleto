FROM node:lts

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/

RUN npm install
RUN npm install pm2 -g

COPY . /usr/src/app/

RUN npm run build

EXPOSE 3000

CMD ["pm2-runtime", "build/server.js"]