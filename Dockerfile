FROM node:10.15-alpine as build
COPY repositories /etc/apk/repositories
RUN apk add --no-cache g++ gnupg python make git

WORKDIR /usr/src/app
COPY package.json .

RUN yarn config set registry https://registry.npm.taobao.org && yarn install

COPY . .
RUN npm run build

FROM node:10.15-alpine as build-module
COPY repositories /etc/apk/repositories
RUN apk add --no-cache g++ gnupg python make git

WORKDIR /usr/src/app
COPY package.json .

RUN yarn config set registry https://registry.npm.taobao.org && yarn install --prod

FROM node:10.15-alpine
WORKDIR /usr/src/app
RUN npm install --registry https://registry.npm.taobao.org -g pm2

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build-module /usr/src/app/node_modules ./node_modules
COPY package.json .
COPY process.yml .

CMD pm2-runtime process.yml
