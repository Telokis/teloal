FROM node:18-slim as build

RUN mkdir -p /build

WORKDIR /build

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .

RUN npx nx run-many -t build

FROM node:18-alpine as teloalapi

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app/node_modules/@teloal

WORKDIR /home/node/app

ENV NODE_ENV=production

# Install app dependencies
COPY --chown=node package*.json ./

RUN npm ci --production

COPY --from=build --chown=node /build/dist/libs/helpers/ /home/node/app/node_modules/@teloal/helpers/
COPY --from=build --chown=node /build/dist/libs/lb4-cache/ /home/node/app/node_modules/@teloal/lb4-cache/
COPY --from=build --chown=node /build/dist/libs/parse-character/ /home/node/app/node_modules/@teloal/parse-character/

COPY --from=build --chown=node /build/dist/apps/teloalapi/ .

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "src/main.js" ]
