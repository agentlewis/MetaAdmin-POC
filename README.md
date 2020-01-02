# MetaAdmin - POC

## Overview
Create and Edit graphql schemas in react-admin and convert these to typescript in the codebase and auto generate react-admin views for these. We also want to auto document the schema objects in Postman.

## Tech stack
### [Firebase Firestore Database](https://firebase.google.com/products/firestore/) and [react-admin-provider](https://github.com/benwinding/react-admin-firebase)
Firestore provides us with a realtime solution that has no schema opinions on the data that is added to it. This means the schema can be held by the front end making it perfect for MetaAdmin as we can then develop the schemas in react admin and immediately start pushing data to firestore. 

*NOTE: An interesting side effect/opportunity of this could be to version our schemas, essentially allowing us to drop or add fields to the schema and then develop rendering components for the versions. This opens up a can of worms - but is an interesting tool for lager apps that have reached a point in there life cycle that they need to change significantly but want to maintain legacy support.*

### [Graphqljs](https://graphql.org/graphql-js) and [graphql-compose](https://graphql-compose.github.io/docs/intro/quick-start.html)
We need to standardise into a graphql Schema Defined Language (SDL) schema so we can convert it to typescript and send it to postman. Graphqljs has a convenient [graphql-compose-json](https://graphql-compose.github.io/docs/plugins/plugin-json.html) for converting api responses into sdl objects, we will use this to convert the react admin form entered into a SDL. As a fallback we could use [printSchema](https://graphql.org/graphql-js/utilities/#printschema).

### [React Admin](https://marmelab.com/react-admin/Readme.html) with [custom inputs](https://marmelab.com/react-admin/Inputs.html#writing-your-own-input-component)
Firstly React Admin is awesome! We will use it as the framework we build MetaAdmin on. In order to do meta programming we need a "builder" form where we can define the fields of our schema. This will require extending react-admin, specifically its use of [react-final-form](https://final-form.org/react). Tee react-admin-form [demo builder app](https://github.com/final-form/builder-demo) is a great example of this. Specifically we will need to build a similar form builder with an array of questions generated from data in react-final-forms store. Start by looking at the [index.js](https://github.com/final-form/builder-demo/blob/master/pages/index.js#L85) page to see how you can get out the current values from RFF and [questions component](https://github.com/final-form/builder-demo/blob/master/components/Questions.js#L17) which binds to the RFF state "questions" and renders current state of the builder view and dynamically updates as you add new elements.

*NOTE: we will want to save both the react-final-form state for retrival to edit the form later and resulting SDL schema from graphql-compose somewhere for debugging (ie checking against what comes out of nexus-js). We may also need combine the SDLs of several objects before passing it the Nexus sdl converter as it may only be expecting 1 sdl to be converted :).*

### [React Admin Fake Rest](https://github.com/marmelab/FakeRest)
Rather then developing against the firebase database we will use fake rest to create a local fake data object.
We will need to generate the fake data in the file - this may be done with the original json objects created by react-final-form before its converted into SDL with graphql-compose. Perhaps using [faker.js](https://github.com/marak/Faker.js/) or something like it. An alternative to this is to [build a provider that wraps](https://github.com/marmelab/react-admin/tree/master/packages/ra-data-graphql-simple) [Graphql Faker](https://github.com/APIs-guru/graphql-faker) and then pass it the resulting combined SDL from MetaAdmin.

### [React admin Guesser](https://marmelab.com/blog/2018/10/18/react-admin-2-4.html#field-and-input-guessers)
React Admin has a great guesser component that allows us to just push our data through and render it - ideally we will generate this once a schema form is submitted, failding that the dev can start with this and we can have a code snippet to get started with. Given we are controlling the creation code we can guarantee that this will work with the [guesser code](https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/inference/InferredElement.ts) and its [assertions](https://github.com/marmelab/react-admin/blob/master/packages/ra-core/src/inference/assertions.ts). We know that this is not something that can be pushed to production - but it will be a great starting place for any new top level objects we create. 

### [Nexus js](https://nexus.js.org/) to generate typespcript types
We can use the nexus [sdl converter](https://github.com/prisma-labs/nexus/blob/develop/src/sdlConverter.ts) that they built for the website to create nexus types and then use the normal nexus command to generate typescript types (and sdls again) for broader use in the codebase. 

### [Pushing to postman](https://docs.api.getpostman.com/?version=latest#99810ef3-3cc0-a6cc-06f5-d8e2ae9d84e4)
This involves two steps 1. [create a github action for it](https://github.com/agentlewis/webhook-action) and 2. [use the graphql to postman](https://github.com/postmanlabs/graphql-to-postman) code to convert our sdl to a Postman Collection V2 type.


## Prior art to checkout
[Api Platform](https://github.com/api-platform/admin)





# OLD README: Get started
An example project for the [react-admin-firebase](https://github.com/benwinding/react-admin-firebase) package.

You need to add the private Firebase connection file: `src/FIREBASE_CONFIG.js` with the following format from firebase:

``` js
export const firebaseConfig = {
  apiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  authDomain: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  databaseURL: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  projectId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  storageBucket: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  messagingSenderId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
};

Don't forget to add the `export` infront of the configuration that Firebase gives you!

Then just run `npm run start`
