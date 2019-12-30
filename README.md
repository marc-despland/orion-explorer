# orion-explorer

## Summary

Orion-Explorer is a simple web app design to browse the [FIWARE](https://www.fiware.org) [Orion](https://fiware-orion.readthedocs.io/en/master/) content (types, entities and subscriptions).

Orion should be exposed through a [Wilma PEP Proxy](https://fiware-pep-proxy.readthedocs.io/en/latest/) and connected to a working [Keyrock](https://fiware-pep-proxy.readthedocs.io/en/latest/)

An application must be configured with / as a callback

## Run Orion-Explorer

Orion Explorer is developed to be run from a docker container and configured at runtime using environment variables.

* VUE_APP_CLIENT_ID : The client id of the application
* VUE_APP_REDIRECT_URI : The callback URI of the application
* VUE_APP_ORION_URL : The URL of Orion through the PEP Proxy
* VUE_APP_ORION_SERVICE : The default Fiware-Service
* VUE_APP_ORION_SERVICE_PATH : The default Fiware-ServicePath
* VUE_APP_OAUTH_URL : The URL of KeyRock API


A [docker-compose.yaml](./docker-compose.yaml) file is available to start the application

## Project development
The project is developed using [VueJS](https://cli.vuejs.org/config/)

You can create a docker container to manage the source:
```
docker build -t vuejs -f Dockerfile.vuejs .
```
Then run it from the root folder
```
docker run -it --rm -v $PWD:/app -w /app -p 8080:8080 vuejs
```

Then use the comon commands:

### Install modules

```
npm install
```
### Run development server

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

The you can recreate the Docker image from an other shell
```
docker build -t marcdespland/orion-explorer .
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

