#############################
#  ____                     #
# |  _ \                    #
# | |_) |  __ _  ___   ___  #
# |  _ <  / _` |/ __| / _ \ #
# | |_) || (_| |\__ \|  __/ #
# |____/  \__,_||___/ \___| #
#                           #
#                           #
#############################
FROM node:18-slim as build

RUN mkdir -p /build

WORKDIR /build

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source code
COPY . .

RUN npx nx run-many -t build

#####################################################
#  _______     _                _                _  #
# |__   __|   | |              | |              (_) #
#    | |  ___ | |  ___    __ _ | |  __ _  _ __   _  #
#    | | / _ \| | / _ \  / _` || | / _` || '_ \ | | #
#    | ||  __/| || (_) || (_| || || (_| || |_) || | #
#    |_| \___||_| \___/  \__,_||_| \__,_|| .__/ |_| #
#                                        | |        #
#                                        |_|        #
#####################################################
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
COPY --from=build --chown=node /build/dist/libs/upound/ /home/node/app/node_modules/@teloal/upound/
COPY --from=build --chown=node /build/dist/libs/pseudo-crypto/ /home/node/app/node_modules/@teloal/pseudo-crypto/

COPY --from=build --chown=node /build/dist/apps/teloalapi/ .

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}
CMD [ "node", "src/main.js" ]

#########################################################################
#  _______     _                _           __                     _    #
# |__   __|   | |              | |         / _|                   | |   #
#    | |  ___ | |  ___    __ _ | | ______ | |_  _ __  ___   _ __  | |_  #
#    | | / _ \| | / _ \  / _` || ||______||  _|| '__|/ _ \ | '_ \ | __| #
#    | ||  __/| || (_) || (_| || |        | |  | |  | (_) || | | || |_  #
#    |_| \___||_| \___/  \__,_||_|        |_|  |_|   \___/ |_| |_| \__| #
#                                                                       #
#                                                                       #
#########################################################################
FROM node:18-alpine as teloal-frontend

# Set to a non-root built-in user `node`
USER node

ENV NODE_ENV=production

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app/

WORKDIR /home/node/app

COPY --from=build --chown=node /build/dist/apps/teloal-frontend/ .

RUN npm i --no-package-lock

COPY --from=build --chown=node /build/dist/libs/helpers/ /home/node/app/node_modules/@teloal/helpers/

ENV HOST=0.0.0.0 PORT=3001

EXPOSE ${PORT}
CMD [ "npm", "start" ]
