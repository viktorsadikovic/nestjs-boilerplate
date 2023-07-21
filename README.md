<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Template

##  Introduction
The main purpose of this repository is to show a project setup and workflow for NestJS application. The Rest APIs will be using the Swagger (OpenAPI) Specification.

## Tools
- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm), [mongoose](https://www.npmjs.com/package/mongoose))
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config))
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer), [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer))
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n))
- [x] Swagger
- [X] Helmet
- [X] Compression
- [X] Throttler
- [X] Compodoc
- [X] Helmet
- [X] Logger
- [X] E2E and units tests
- [X] ESLint
- [X] Prettier
- [X] Docker
- [X] Husky
- [X] CI (Github Actions).



## Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|APP_ENV           | Environment values ["local", "development", "staging", "production"]            | "local"      |
|APP_NAME           | Application name            | "*"      |
|APP_HOST           | Application host            | "localhost"      |
|APP_PORT           | Application port            | "3000"      |
|APP_FALLBACK_LANGUAGE           | Default language             | "en"      |
|APP_HEADER_LANGUAGE           | Language header            | "x-custom-lang"      |
|API_PREFIX           | API prefix            | "api"      |
|API_VERSION           | API version            | "v1"      |
|SWAGGER_PATH           | Swagger docs path            | "docs"      |
|SWAGGER_USER           | Swagger credentials            | "*"      |
|SWAGGER_PASSWORD           | Swagger credentials            | "*"      |
|THROTTLER_TTL           | Throttler TTL            | "*"      |
|THROTTLER_LIMIT           | Number of requests            | "*"      |
|MONGODB_DB           | DB name            | "*"      |
|MONGODB_HOST           | DB host            | "*"      |
|MONGODB_USER           | DB user            | "*"      |
|MONGODB_PASSWORD           | DB password            | "*"      |
|MONGODB_RETRY_ATTEMPTS           | DB num retry attempts            | "*"      |
|DATABASE_URL           | DB url            | "*"      |
|DATABASE_TYPE           | DB type: "postgres", "mysql" etc.            | "*"      |
|DATABASE_HOST           | DB host            | "*"      |
|DATABASE_PORT           | DB port            | "5432"      |
|DATABASE_USERNAME           | DB username            | "*"      |
|DATABASE_PASSWORD           | DB password            | "*"      |
|DATABASE_NAME           | DB name            | "*"      |
|DATABASE_SYNCHRONIZE           | Cors accepted values            | "*"      |


##  Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


##  Getting started
- Clone the repository
```
git clone  <github template url> nestjs-boilerplate
```
- Go to folder, and copy `env-example` as `.env`.

```
cd nestjs-boilerplate/
cp env-example .env
```
- Install dependencies
```
cd nestjs-boilerplate
npm install
```
    
- Build and run the project
```
npm run start:dev
```
  Navigate to `http://localhost:3000`

- API Document endpoints

  swagger Spec Endpoint : http://localhost:3000/api/v1/docs-json 

  swagger-ui  Endpoint : http://localhost:3000/api/v1/docs 


## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **test**        | Contains unit and e2e tests 
| **src/common**      |  Common things to be used across the app.
| **src/config**              | Application configuration
| **src/database**      | Database configuration 
| **src/i18n**           | Localization files                       
| **src/modules**           | Contains all Feature Modules
| **src**/app.module.ts         | Application(Main) Module                                  
| **src**/main.ts         | Entry point to the NestJS app                               
| Dockerfile              | Contains all the commands a user could call on the command line to assemble an image
| docker-compose.yaml   |  File defining services, networks, and volumes for a Docker application
| .prettierrc              | Prettier setup        
| .eslintrc.js              | ESLint setup             
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    
| tsconfig.json              |  Specifies the root files and the compiler options

## Building the project

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `prebuild`                   | Remove dist folder |
| `start`                   | Runs full build and runs node on dist/main.js. Can be invoked with `npm start`                  |
| `start:dev`                   | Start the project in development mode                 |
| `start:prod`                  | Start the project in production mode                  |
| `test`                    | Runs build and runs tests        |
| `test:watch`                    | Runs build and runs tests in watch mode     |
| `test:cov`                    | Show test coverage        |
| `test:e2e`                    | Runs e2e tests        |
| `docs:generate`                    | Generate app documentation        |
| `lint`                    | Runs TSLint on project files       |


# Commit message rules
```
"type(scope): your commit message"
```
| Type | Scope |  
| --------------------------- | ------------------------------------------------------------------------------------------------- |
| `ci`, `chore`, `docs`, `feat`,`fix`, `perf`, `refactor`, `revert`, `style`                | Module/component you are working on|

# [Pull Request Template](http://link.com)

# Common Issues


