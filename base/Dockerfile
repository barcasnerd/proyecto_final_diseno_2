FROM node:14 AS build
ARG npm_cred
ARG node_prune="true"

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run tsc

# remove development dependencies
RUN npm prune --production

FROM node:14
ARG npm_cred

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /usr/src/app/build ./build

EXPOSE 5000

CMD ["npm", "run", "start"]
