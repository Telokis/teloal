- [Teloal](#teloal)
- [Available endpoints](#available-endpoints)
- [Local development](#local-development)
  - [Notable dependencies](#notable-dependencies)
    - [NX](#nx)
    - [Loopback](#loopback)
    - [node-config](#node-config)
  - [Dev env file](#dev-env-file)
  - [Docker-compose](#docker-compose)
  - [Run command](#run-command)

# Teloal

This repository contains tools made for the game [Adventure Land](https://adventure.land/).  
The main tool is a public API available for everyone at https://teloalapi.telokis.fr  

Here is an overview of the available features:
- Compute the best upgrade path for a given item and base price.
- See the online merchants and their current stands.
- Retrieve the game's `G` data as json.

# Available endpoints

See the list of endpoints and play with them at https://teloalapi.telokis.fr/swagger.


# Local development

## Notable dependencies

This repository relies on several libraries that not everyone is familiar with.  
It's important to at least be aware of what they are and what purpose they serve before getting started with development.

### NX

Link: https://nx.dev/getting-started/why-nx

This repository relies on NX to manage the monorepo aspect.  
You can see a `nx.json` file specifying some configuration for the engine to work.  
One key aspect to note is that all dependencies are only specified in the root's `package.json` file. This ensures consistent versions across all subprojects.  
The projects are splitted into two categories: `libs` and `apps`.  
An app can be executed/served and will rely on the libs. **An app cannot and shouldn't be imported into another app**.  
A lib, on the other hand, can not be executed and will be imported by one or several apps.

### Loopback

Link: https://loopback.io/doc/en/lb4/index.html

Loopback is a framework based on the [inversion of control](https://en.wikipedia.org/wiki/Inversion_of_control) pattern.  
It is used as the core of the api app.  
For example, we define Loopback models that will then be seamlessly put into mongo without much effort on our end.  
It also includes an openapi spec exporter that is relied upon to generate [this page](https://teloalapi.telokis.fr/swagger).

### node-config

Link: https://github.com/node-config/node-config

Node-config is used to manage environment-dependant configuration.  
It is mostly contained within its own `config` folder in the app but its type definition is found inside the `types` folder.  
We can see several files: one per supported environment (`test`, `development` and `production`), one called `default.js` and one called `custom-environment-variables.js`.  
The `default.js` file is kind of the entrypoint of the configuration, it will be loaded first no matter the environment. It's there that we'll read the `.env` file, for example.  
Then, values will be overriden by environment specific files. If no `NODE_ENV` environment variable is specified, the environment devaults to `development`.  
Finally, values are overriden by the environment variables specified inside `custom-environment-variables.js` if they're defined. You can put them into your `.env` file to override things in development, for example. (See [Dev env file](#dev-env-file))

## Dev env file

The first step is to create a `.env` file for the dev version.  
Its full path is `./apps/teloalapi/.env`.  
Here is what is could look like:

```# Required for the dev config to properly be found
NODE_CONFIG_DIR=./dist/apps/teloalapi/config
# Required if you want to use authenticated endpoints
AL_TOKEN=<your al token>
```

## Docker-compose

A `docker-compose.yml` is provided for development purposes. It preconfigures the services used by the API.  
Currently, the following services are configured:
- `mongodb` as long-term storage.
- `mongo-express` accessible at http://localhost:7937 to easily visualize what's in mongodb.

Simply run `docker-compose up -d` at the root of the repository to get things started.


## Run command

Use the following command to rebuild and serve the server. This won't watch the files, you need to do it again when changing something:

```
npx nx run teloalapi:build && npx nx run teloalapi:serve
```
