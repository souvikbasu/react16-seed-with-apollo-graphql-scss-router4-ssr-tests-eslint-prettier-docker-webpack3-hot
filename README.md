# React seed project to create your own app
Use this seed to create your own React app. It uses React v16 and has following features
* Apollo client to connect to GraphQL server
* SCSS
* React Router v4
* Server Side Rendering
* Snapshot tests using Jest and Enzyme
* Imperative testing using Mocha and Chai
* ESLint
* Prettier
* Docker
* Webpack 3
* Hot reloading

## Getting started

Clone this repository

```
git clone https://github.com/souvikbasu/react16-seed-with-apollo-graphql-scss-router4-ssr-tests-eslint-prettier-docker-webpack3-hot.git
```


To install dependencies
```
yarn
```

To run the app on localhost (Client side rendering)
```
yarn start
```
The above command runs the app using Webpack dev server.
Access the app at http://localhost:3000


To build production code

```
yarn build
```
The code will be created in the `build` folder


To run Node server (SSR)
```
yarn run start:prod:server
```
The above command runs the app on a production level node server
Access the app at http://localhost:3000

Change `developer`, `production` and `tests` config at `./src/appSettings`
